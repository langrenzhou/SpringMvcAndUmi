package com.langRenzhou.Service.Impl;

import com.langRenzhou.Dao.ProductDao;
import com.langRenzhou.Entity.Product;
import com.langRenzhou.Service.ProductService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;
@Service(value="pro")
public class ProductServiceImpl implements ProductService {
    @Resource
    private ProductDao productDao;
    @Override
    public boolean addProduct(Product product) {
       return productDao.addProduct(product) > 0;
    }

    @Override
    public List<Product> getProducts(int pages, int num) {
        return productDao.productList(pages,num);
    }
}
