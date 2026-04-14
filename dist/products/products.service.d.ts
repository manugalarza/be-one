import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
}
export declare class ProductsService {
    private products;
    private nextId;
    findAll(): Product[];
    findOne(id: number): Product;
    create(dto: CreateProductDto): Product;
    update(id: number, dto: UpdateProductDto): Product;
    remove(id: number): Product;
}
