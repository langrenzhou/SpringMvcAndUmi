package com.langRenzhou.Service;

import com.langRenzhou.Entity.Product;

import java.util.List;

public interface ProductService {
    public boolean addProduct(Product product);
    public List<Product> getProducts(int page,int num);
}
