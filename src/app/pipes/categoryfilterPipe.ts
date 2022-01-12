import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'categoryFilter' })
export class CategoryFilterPipe implements PipeTransform {
    transform(products: any[], category: string): any {
        if(category === null || category === ""){
            return products
        }else{
            return products.filter(p => p.category === category);
        }
    }

}
