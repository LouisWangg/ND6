const Joi = require('joi')

module.exports = {
    createStockDetail (req, res, next) {
        const schema = Joi.object({
            stockId: Joi.number().integer(),
            description: Joi.string(),
            status: Joi.string(),
            productId: Joi.number().integer(),
            expiredDate: Joi.date().format('YYYY-MM-DD').utc(),
            quantity: Joi.number().integer().positive(),
            price: Joi.number().integer().positive()
        })

        const {error} = schema.validate(req.body)

        if (error) {
            switch (error.details[0].context.key) {
                case 'stockId' :
                    res.status(400).send({
                        error: 'Stock ID must be put in integer'
                    })
                    break

                case 'description' :
                    res.status(400).send({
                        error: 'Description must be put in string'
                    })
                    break

                case 'status' :
                    res.status(400).send({
                        error: 'Status must be put in string'
                    })
                    break
    
                case 'productId' :
                    res.status(400).send({
                        error: 'Product ID must be put in integer'
                    })
                    break

                case 'expiredDate' :
                    res.status(400).send({
                        error: 'Date must be in the format of "YYYY-MM-DD" (please also input the - sign)'
                    })
                    break
        
                case 'quantity' :
                    res.status(400).send({
                        error: `The number of quantity you provided failed to match the following rules : 
                            <br>
                            1. It can only contain integer format (without floating point)
                            <br>
                            2. It must be a positive number 
                        `
                    })
                    break

                case 'price' :
                    res.status(400).send({
                        error: `The number of price you provided failed to match the following rules : 
                        <br>
                        1. It can only contain integer format (without floating point)
                        <br>
                        2. It must be a positive number 
                    `
                    })
                    break

                default :
                    res.status(400).send({
                        error: 'Invalid information detected'
                    })
            }
        } else {
            next()
        }
    },
    editQuantity (req, res, next) {
        const schema = Joi.object({
            stockDetailId: Joi.number().integer(),
            productId: Joi.number().integer(),
            quantity: Joi.number().integer().positive(),
            price: Joi.number().integer().positive(),
        })

        const {error} = schema.validate(req.body)

        if (error) {
            switch (error.details[0].context.key) {
                case 'stockDetailId' :
                    res.status(400).send({
                        error: 'Provided stock detail ID is not valid'
                    })
                    break

                case 'productId' :
                    res.status(400).send({
                        error: 'Provided product ID is not valid'
                    })
                    break

                case 'quantity' :
                    res.status(400).send({
                        error: `The number of quantity you provided failed to match the following rules : 
                            <br>
                            1. It can only contain Integer format (without floating point)
                            <br>
                            2. It must be a positive number 
                        `
                    })
                    break

                case 'price' :
                    res.status(400).send({
                        error: `The number of price you provided failed to match the following rules : 
                        <br>
                        1. It can only contain Integer format (without floating point)
                        <br>
                        2. It must be a positive number 
                    `
                    })
                    break

                default :
                    res.status(400).send({
                        error: 'Invalid edit product information'
                    })
            }
        } else {
            next()
        }
    },
}
