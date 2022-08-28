const axios = require('axios')

//Config excel4node
const xl = require('excel4node')
const wb = new xl.Workbook()
const ws = wb.addWorksheet('Countries List')

exports.createExcel = async (req, res) => {
    
    try {
        let countries = []
        let CountryName = []
        let capital = []
        let area = []
        let currencies = []
        let infoCurrencies = []
        let data = [] //To receive data from each country ( {name, capital, area, currencies})
        
        //To consume API
        await axios.get('https://restcountries.com/v3.1/all').then(res => {
            if(res.status == 200) {
                countries = res.data
            }
            
        })

        //To filter datas and push in to respective variables
        countries.forEach(country => {

            //Country
            CountryName.push(country.name.common)

            //Capital
            const infoCapital = country['capital']
            if(infoCapital == undefined || infoCapital == null) {
                capital.push('-') //replace data undefined to '-'
            } else {
                capital.push(infoCapital[0])
            }
            
            //Area
            if(country.area == undefined || country.area == null) {
                area.push('-') //replace data undefined to '-'
            } if (Number.isInteger(country.area)) {
                area.push(`${(country.area).toLocaleString('pt-BR')},00`)
            } else {
                area.push((country.area).toLocaleString('pt-BR'))
            }
            
            //Currency
            const infoCurrency = country['currencies']
            if(infoCurrency == undefined || infoCurrency == null) {
                currencies.push('-') //replace data undefined to '-'
            } else {
                currencies.push(Object.keys(infoCurrency))
            }

            infoCurrencies.push(country)//used to find the number of countries
        })

        //To join/build an array with specific datas from each country 
        for(let c = 0; c <= (infoCurrencies.length) - 1; c++){
            data.push({
                name: CountryName[c],
                capital: capital[c],
                area: area[c],
                currency: currencies[c]
            })
        }

        //Config to create excel with excel4node
        const headingColumNames = [
            "Name",
            "Capital",
            "Area",
            "Currencies"
        ];

        //Styles tables  to excel

        //Title
        const styleTitle = wb.createStyle({
            font: {
                color: '#4F4F4F',
                size: 16,
                bold: true
            },
            alignment: {
                vertical: 'center',
                horizontal: 'center'
            },
            border: {
                left: {
                    style: 'thin',
                    color: '#808080'
                },
                right: {
                    style: 'thin',
                    color: '#808080'
                },
                bottom: {
                    style: 'thin',
                    color: '#808080'
                },
                top: {
                    style: 'thin',
                    color: '#808080'
                }
            },
            fill: {
                type: 'pattern',
                patternType: 'solid',
                bgColor: '#d3d3d3',
                fgColor: '#d3d3d3',
            } 
        });

        //Head names
        const styleHeading = wb.createStyle({
            font: {
                color: '#808080',
                size: 12,
                bold: true,
            },
            border: {
                bottom: {
                    style: 'thin',
                    color: '#808080'
                },
                right: {
                    style: 'thin',
                    color: '#808080'
                },
                top: {
                    style: 'thin',
                    color: '#808080'
                },
                left: {
                    style: 'thin',
                    color: '#808080'
                }
            },
            fill: {
                type: 'pattern',
                patternType: 'solid',
                bgColor: '#d6e3ef',
                fgColor: '#d6e3ef',
            }
        });

        //Data in odd row
        const styleData = wb.createStyle({
            font: {
                size: 12
            },
            border: {
                bottom: {
                    style: 'thin',
                    color: '#808080'
                },
                right: {
                    style: 'thin',
                    color: '#808080'
                },
                top: {
                    style: 'thin',
                    color: '#808080'
                },
                left: {
                    style: 'thin',
                    color: '#808080'
                },
            }
        });

        //Data in even row
        const styleData2 = wb.createStyle({
            font: {
                size: 12
            },
            border: {
                bottom: {
                    style: 'thin',
                    color: '#808080'
                },
                right: {
                    style: 'thin',
                    color: '#808080'
                },
                top: {
                    style: 'thin',
                    color: '#808080'
                },
                left: {
                    style: 'thin',
                    color: '#808080'
                },
            },
            fill: {
                type: 'pattern',
                patternType: 'solid',
                bgColor: '#d6e3ef',
                fgColor: '#d6e3ef',
            }
        });

        //Add Title and your style
        ws.cell(1,1,1,4,true).string('Countries List').style(styleTitle)

        //Add Head names and your style
        let headingColumnIndex = 1;
        headingColumNames.forEach(name => {
            ws.cell(2, headingColumnIndex++).string(name).style(styleHeading)
        });
        
        //Add datas from each country and your style
        let rowIndex = 3
        data.forEach(inf => {
            let columnIndex = 1;
            Object.keys(inf).forEach(infName => {
                
                //Condition to add color in the row
                if(rowIndex % 2 === 0) {
                    return ws.cell(rowIndex, columnIndex++).string(inf[infName]).style(styleData2)
                } else {
                    ws.cell(rowIndex, columnIndex++).string(inf[infName]).style(styleData)
                }   
            })
            rowIndex++
        });
        wb.write('countries.xlsx') //To create the excel table.

        res.redirect('/') //Redirect to homepage

    }catch(err) {
        
        //If have erro to consume API will render an error's page with bad request
        console.log(err)
        res.render('404')
    }
}
