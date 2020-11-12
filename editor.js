const fs = require('fs')
const jsonData = require('./costumesEdited.json')
const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// Create a costume


// Edit a costume
const startEdit = () => {
    rl.question('Edit a costume by entering its ID: ', id => {
        console.log(`You selected: \n${jsonData[id].caption}`)
        
        let question = '\nType in a property name to edit or create a new property. \nCurrent properties: '
        for (const prop in jsonData[id]) {
            question += `${prop} `
        }
        question += '\n'

        rl.question(question, property => {
            rl.question(`Enter a value for ${property}: `, value => {
                rl.question(`Set jsonData[${property}] as ${value}? Yes or no: `, confirmation => {
                    if (confirmation.toLowerCase() == 'yes') {
                        jsonData[id][property] = value
                        console.log(jsonData[id])
                        updateFile()
                    } else {
                        rl.close() // ends the program 
                    }
                })
            })

        })
    })
}


// Delete a costume


// Prompt user
const init = () => {
    rl.question('Create, edit or delete a costume? ', mode => {
        switch (mode.toLowerCase()) {
            case 'create':
                // startCreate
                break;
            case 'edit':
                startEdit()
                break;
            case 'delete': 
                // startDelete
                break;
        }
    })
}

const updateFile = () => {
    fs.writeFile('costumesEdited.json', JSON.stringify(jsonData), (err) => {
        if (err) throw err
        console.log('Data written')
    })
}

init()

