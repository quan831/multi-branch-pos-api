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
                    `${process.env.APP_URL || "http://localhost:3000"}/api`
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
                        name: { type: "string" },
                        price: {
                            type: "number",
                            format: "double"
                        },
                        description: { type: "string" }
                    }
                },
                Branch: {
                    type: "object",
                    properties: {
                        name: { type: "string" },
                        address: { type: "string" }
                    }
                },
                Customer: {
                    type: "object",
                    properties: {
                        name: { type: "string" },
                        phone: { type: "string" },
                        email: { type: "string" }
                    }
                },
                Inventory: {
                    type: "object",
                    properties: {
                        productId: { type: "integer" },
                        branchId: { type: "integer" },
                        quantity: { type: "integer" }
                    }
                },
                Order: {
                    type: "object",
                    properties: {
                        branchId: { type: "integer" },
                        customerId: { type: "integer" },
                        totalAmount: {
                            type: "number",
                            format: "double"
                        },
                        paymentMethod: { type: "string" },
                        syncStatus: { type: "string" },
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
                        price: {
                            type: "number",
                            format: "double"
                        }
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
                },
                SyncStatusUpdateRequest: {
                    type: "object",
                    required: ["orderIds", "status"],
                    properties: {
                        orderIds: {
                            type: "array",
                            items: { type: "integer" }
                        },
                        status: {
                            type: "string",
                            enum: ["synced", "pending", "failed"],
                            description: "New synchronization status for the specified orders"
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