import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(): import("./products.service").Product[];
    findOne(id: number): import("./products.service").Product;
    create(createProductDto: CreateProductDto): import("./products.service").Product;
    update(id: number, updateProductDto: UpdateProductDto): import("./products.service").Product;
    remove(id: number): import("./products.service").Product;
}
