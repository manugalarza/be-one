"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
let ProductsService = class ProductsService {
    constructor() {
        this.products = [
            { id: 1, name: 'Laptop', price: 999.99, description: 'A powerful laptop' },
            { id: 2, name: 'Mouse', price: 29.99, description: 'Wireless mouse' },
        ];
        this.nextId = 3;
    }
    findAll() {
        return this.products;
    }
    findOne(id) {
        const product = this.products.find((p) => p.id === id);
        if (!product) {
            throw new common_1.NotFoundException(`Product #${id} not found`);
        }
        return product;
    }
    create(dto) {
        const product = {
            id: this.nextId++,
            name: dto.name,
            price: dto.price,
            description: dto.description ?? '',
        };
        this.products.push(product);
        return product;
    }
    update(id, dto) {
        const product = this.findOne(id);
        Object.assign(product, dto);
        return product;
    }
    remove(id) {
        const product = this.findOne(id);
        this.products = this.products.filter((p) => p.id !== id);
        return product;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)()
], ProductsService);
//# sourceMappingURL=products.service.js.map