package com.langRenzhou.Controller;

import com.langRenzhou.Entity.Product;
import com.langRenzhou.Service.ProductService;
import jakarta.annotation.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@CrossOrigin(origins = "http://169.254.64.28:8000")
@RequestMapping("/product")
public class ProductController {
    @Resource
    private ProductService productService;
    @PutMapping("/add")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public String addProduct(@RequestBody Product product){
        System.out.println(product);
          return  productService.addProduct(product) ? "success":"error";
    }
    @GetMapping("/list")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public List<Product> listProduct(@RequestParam(value="page") Integer page,@RequestParam(value="num")Integer num){

        return productService.getProducts(page,num);
    }
}
