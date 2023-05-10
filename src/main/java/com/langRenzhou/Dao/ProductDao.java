package com.langRenzhou.Dao;

import com.langRenzhou.Entity.Product;

import java.util.List;

public interface ProductDao {
//    查询产品
     List<Product> productList(int pages,int num);
//    添加产品
     int addProduct(Product product);
}
