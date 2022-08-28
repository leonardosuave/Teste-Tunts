const axios = require('axios') //To consume API

exports.index = async (req, res) => {
    
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
                //console.log(res.status) 
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
                currencies.push('-')//replace data undefined to '-'
            } else {
                currencies.push(Object.keys(infoCurrency))
            }
            
            infoCurrencies.push(country) //used to find the number of countries
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
    
        //Render a view EJS and send the variable data to build a table 
        return res.render('index', {data})
        
    }catch(err) {

        //If have error to consume API will render an error's page with bad request
        console.log(err)
        return res.render('404')
    }
}
