# Tasking

## 1. 格式化输入数据

1. input:
    ```javascript
    1. selectedItems : [selectedItem : string]
    ```
1. output:
    ```javascript
    1. formatedSelectedItems : [
        formatedCartItem : {
            id:string, 
            count:number
        }
    ]
    ```

## 2. 获取每种商品信息

1. input:
     ```javascript
    1. formatedSelectedItems
    2. allItems:[
        {
            id:string, 
            name:string, 
            price:float
        }
    ]
    ```
2. output:
    ```javascript
    1. dishesItems:[
        {
            id:string, 
            name:string, 
            count:number, 
            price:float
        }
    ]
    ```

## 3. 计算每种商品的小计

1. input:
     ```javascript
    1. dishesItems
    ```
2. output:
     ```javascript
    1. orderDetail:[
        {
            dishesItems:{
                id:string,
                name:string,
                count:number,
                price:float
            },
            subtotal:float
        }
    ]
    ```

## 3. 计算每种商品使用的优惠方式

1. input:
    ```javascript
    1. dishesItems
    2. promotions:[
        {
            type:string,
            items:[string]
        }
    ]
    ```
2. output:
    ```javascript
    1. discountsItem:[
        {
            type:string,
            disherItem:[string],
            saveMoney:float
        }
    ]
    ```

## 4. 计算总计

1. input:
     ```javascript
     1. orderDetailItems
     2. discountItems
     ```
2. output:
    ```javascript
    totalMoney:number
    ```

## 5. 打印订餐明细

1. input:
     ```javascript
     1. orderDetail
     2. preferentialWay
     ```
2. output:

    ```javascript
    receipt:{
        orderDetail:[
            {
                dishesItems:{
                    id:string,
                    name:string,
                    count:number,
                    price:float
                },
                subtotal:float
            }
        ],
        discountsItem:[
            {
                type:string,
                disherItems:[string],
                saveMoney:float
            }
        ],
        totalMoney:number
    }
    ```