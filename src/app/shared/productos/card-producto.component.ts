import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { getState, PRODUCTOS_KEY, setState } from '@utils/storage';

@Component({
  selector: 'app-card-productos',
  templateUrl: 'card-producto.component.html',
  styleUrls: ['./card-producto.component.scss'],
})
export class CardProductoComponent implements OnInit {
  @Input() productForm: FormGroup;
  @Input() index: number = 0;

  constructor() {}

  ngOnInit() {
    this.productForm.valueChanges.subscribe((product) => {
      const productos = JSON.parse(getState(PRODUCTOS_KEY) || '[]');
      const newProducts =
        productos?.filter((x) => x.idCatalogo !== product.idCatalogo ) || [];
      setState(PRODUCTOS_KEY, [...newProducts, product]);
    });
  }
}
