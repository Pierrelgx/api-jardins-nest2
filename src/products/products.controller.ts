import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Product, ProductTypes } from './entities/product.entity';
import { Admin } from '../authorization/admin.decorator';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiCreatedResponse({ type: Product, description: 'create new product' })
  @ApiBadRequestResponse()
  @Post()
  @Admin(true)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiOkResponse({
    type: Product,
    isArray: true,
    description: 'finds all products',
  })
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'productType', required: false })
  @Get()
  findAll(
    @Query('name') name?: string,
    @Query('productType') productType?: ProductTypes,
  ) {
    return this.productsService.findAll(name, productType);
  }

  @ApiOkResponse({ type: Product, description: 'finds a specific product' })
  @ApiNotFoundResponse()
  @Get(':id')
  findOne(@Param('id') id: string) {
    const product = this.productsService.findOne(id);
    if (!product) {
      throw new NotFoundException();
    }
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @Admin(true)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @Admin(true)
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
