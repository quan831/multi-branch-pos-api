const swaggerJsdoc = require(
    "swagger-jsdoc"
);

const swaggerUi = require(
    "swagger-ui-express"
);

const path = require("path");

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title:
                "Multi Branch POS API",

            version: "1.0.0",

            description:
                "API documentation"
        },

        servers: [
            {
                url:
                    "http://localhost:3000"
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            },
            schemas: {
                Product: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        name: { type: "string" },
                        sku: { type: "string" },
                        price: { type: "number" },
                        category: { type: "string" },
                        description: { type: "string" }
                    }
                },
                Branch: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        name: { type: "string" },
                        address: { type: "string" },
                        phone: { type: "string" }
                    }
                },
                Customer: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        name: { type: "string" },
                        phone: { type: "string" },
                        email: { type: "string" }
                    }
                },
                Inventory: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        productId: { type: "integer" },
                        branchId: { type: "integer" },
                        quantity: { type: "integer" },
                        minStockLevel: { type: "integer" }
                    }
                },
                Order: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        branchId: { type: "integer" },
                        customerId: { type: "integer" },
                        totalAmount: { type: "number" },
                        paymentMethod: { type: "string" },
                        status: { type: "string" },
                        items: {
                            type: "array",
                            items: { $ref: "#/components/schemas/OrderItem" }
                        }
                    }
                },
                OrderItem: {
                    type: "object",
                    properties: {
                        productId: { type: "integer" },
                        quantity: { type: "integer" },
                        price: { type: "number" }
                    }
                },
                LoginRequest: {
                    type: "object",
                    required: ["username", "password"],
                    properties: {
                        username: { type: "string" },
                        password: { type: "string" }
                    }
                },
                SyncOrdersRequest: {
                    type: "object",
                    properties: {
                        orders: {
                            type: "array",
                            items: { $ref: "#/components/schemas/Order" }
                        }
                    }
                }
            }
        }
    },

    apis: [
        path.join(
            __dirname,
            "../routes/*.js"
        )
    ]
};

const swaggerSpec =
    swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    swaggerSpec
};