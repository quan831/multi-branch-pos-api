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
                User: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        username: { type: "string" },
                        role: { type: "string" },
                        branchId: { type: "integer",
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" } }
                    }
                },
                Product: { type: "object", properties: { id: { type: "integer" },
                        name: { type: "string" },
                        price: {
                            type: "number",
                            format: "double"
                        },
                        description: { type: "string",
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" } }
                    }
                },
                Branch: { type: "object", properties: { id: { type: "integer" },
                        name: { type: "string" },
                        address: { type: "string",
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" } }
                    }
                },
                Customer: { type: "object", properties: { id: { type: "integer" },
                        name: { type: "string" },
                        phone: { type: "string" },
                        email: { type: "string",
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" } }
                    }
                },
                Inventory: { type: "object", properties: { id: { type: "integer" },
                        productId: { type: "integer" },
                        branchId: { type: "integer" },
                        quantity: { type: "integer",
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" } }
                    }
                },
                Order: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        staffId: { type: "integer" },
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
                            items: { $ref: "#/components/schemas/OrderItem",
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" } }
                        }
                    }
                },
                OrderItem: { type: "object", properties: { id: { type: "integer" }, orderId: { type: "integer" },
                        productId: { type: "integer" },
                        quantity: { type: "integer" },
                        price: {
                            type: "number",
                            format: "double",
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" }
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