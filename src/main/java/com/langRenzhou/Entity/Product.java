package com.langRenzhou.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    private int id;
    private String producrName;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    private String departureRime;
    private int productPrice;
    private String productDesc;
    private int productStatus;
    private int productNum;
    private String cityName;
}
