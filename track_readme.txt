App     : Track
Version : 1.0
Author  : Vikrant Mahajan
email   : vikrantm93@gmail.com

Baseurl = http://165.227.125.204:3008/Track/ 



1) baseUrl/shop/add_shop

=========================== FOR  add_shop  ================================

Request Type:- POST

Format :- x-www-form-urlencoded

all parameter mandatory

shop_name
shop_address*
shop_email*
shop_mobile_number*

Response :-

{
    "success": 1,
    "message": "Successfull",
    "data": {
        "shopId": 1,
        "shop_name": "Amit Cloth",
        "shop_address": "#453, Abrol Nagar, Mohali, Punjab",
        "shop_email": "abc@gmail.com",
        "shop_mobile_number": "8998676678",
        "created_at": "2020-07-26T17:05:48.000Z"
    }
}

2) baseUrl/shop/view_shops

=========================== FOR  get all shps  ================================

Request Type:- GET

Response:-


{
    "success": 1,
    "message": "Successfull",
    "data": [
        {
            "shopId": 1,
            "shop_name": "Amit Cloth",
            "shop_address": "#453, Abrol Nagar, Mohali, Punjab",
            "shop_email": "abc@gmail.com",
            "shop_mobile_number": "8998676678",
            "created_at": "2020-07-26T17:05:48.000Z"
        }
    ]
}

3) baseUrl/shop/search_shop

=========================== FOR  search_shop  ================================

Request Type:- GET

parameter mandatory

search*

Response:-

{
    "success": 1,
    "message": "Successfull",
    "data": [
        {
            "shopId": 1,
            "shop_name": "Amit Cloth",
            "shop_address": "#453, Abrol Nagar, Mohali, Punjab",
            "shop_email": "abc@gmail.com",
            "shop_mobile_number": "8998676678",
            "created_at": "2020-07-26T17:05:48.000Z"
        }
    ]
}



if result does not match

Response :- 

{
    "success": 0,
    "message": "No data to show"
}


4) baseUrl/delivery/add_deliveryman

=========================== FOR  delivery add_deliveryman  ================================

Request Type:- POST

Format :- x-www-form-urlencoded

all parameter mandatory

deliveryman_name*
deliveryman_email*
deliveryman_mobile_number*
deliveryman_password*

Response :-

{
    "success": 1,
    "message": "Successfull",
    "data": {
        "deliverymanId": 2,
        "deliveryman_name": "Amit ",
        "deliveryman_email": "abc@gmail.com",
        "deliveryman_mobile_number": "8998676678",
        "created_at": "2020-07-26T17:33:03.000Z"
    }
}

5) baseUrl/delivery/deliveryman_login

=========================== FOR  delivery deliveryman_login  ================================

Request Type:- POST

Format :- x-www-form-urlencoded

all parameter mandatory

deliveryman_email*
deliveryman_password*

Response :-

{
    "success": 1,
    "message": "Successfull",
    "data": {
        "deliverymanId": 5,
        "deliveryman_name": "Vijay",
        "deliveryman_email": "abcz@gmail.com",
        "deliveryman_mobile_number": "8998676678",
        "created_at": "2020-07-30T18:21:43.000Z"
    }
}


6) baseUrl/delivery/getDeliveryMans

=========================== FOR delivery getDeliveryMans  ================================

Request Type:- GET

Response:-


{
    "success": 1,
    "message": "Successfull",
    "data": [
        {
            "deliverymanId": 1,
            "deliveryman_name": "Amit ",
            "deliveryman_email": "abc@gmail.com",
            "deliveryman_mobile_number": "8998676678",
            "created_at": "2020-07-26T17:32:20.000Z"
        },
        {
            "deliverymanId": 2,
            "deliveryman_name": "Amit ",
            "deliveryman_email": "abc@gmail.com",
            "deliveryman_mobile_number": "8998676678",
            "created_at": "2020-07-26T17:33:03.000Z"
        }
    ]
}

7) baseUrl/route/add_route

=========================== FOR  route/add_route  ================================

Request Type:- POST

Format :- x-www-form-urlencoded

all parameter mandatory

route_name*


Response :-

{
    "success": 1,
    "message": "Successfull",
    "data": {
        "routeId": 3,
        "route_name": "Route #47",
        "created_at": "2020-07-26T17:49:22.000Z"
    }
}

8) baseUrl/route/getRoutes

=========================== FOR route/getRoutes  ================================

Request Type:- GET

Response:-


{
    "success": 1,
    "message": "Successfull",
    "data": [
        {
            "routeId": 1,
            "route_name": "Route #45",
            "created_at": "2020-07-26T17:46:15.000Z",
            "deliveryman_name": "Mohit",
            "deliverymanId": 2
        },
        {
            "routeId": 2,
            "route_name": "Route #46",
            "created_at": "2020-07-26T17:47:01.000Z",
            "deliveryman_name": "Vijay",
            "deliverymanId": 5
        },
        {
            "routeId": 3,
            "route_name": "Route #47",
            "created_at": "2020-07-26T17:49:22.000Z",
            "deliveryman_name": " ",
            "deliverymanId": 0
        }
    ]
}

9) baseUrl/route/routeShop

=========================== FOR Assigning route to shop routeShop  ================================

Request Type:- POST

Use json header application/json


Send [["routeId","shopId"]]

Example 

Format for multiple insert shop to assign route

[["1","1"],
["1","3"]]

format for single insert shop to assign route

[["1","3"]]

Response :-

{
    "success": 1,
    "message": "Successfull"
}


10) baseUrl/route/viewRouteShop

=========================== FOR route shop Info  ================================

Request Type:- GET


Response:-

{
    "success": 1,
    "message": "Successfull",
    "data": [
        {
            "shopId": 1,
            "shop_name": "Amit Cloth",
            "shop_address": "#453, Abrol Nagar, Mohali, Punjab",
            "shop_email": "abc@gmail.com",
            "shop_mobile_number": "8998676678",
            "created_at": "2020-07-26T17:05:48.000Z",
            "barcode": "#456789456,#5544666455",
            "routeId": 1
        },
        {
            "shopId": 3,
            "shop_name": "Atul Mobile Shop",
            "shop_address": "#453, Abrol Nagar, Mohali, Punjab",
            "shop_email": "abc@gmail.com",
            "shop_mobile_number": "8998676678",
            "created_at": "2020-07-27T18:38:41.000Z",
            "barcode": "#9839898349",
            "routeId": 1
        }
    ]
}

11) baseUrl/route/assignedTotes

=========================== FOR route assignedTotes  ================================

Request Type:- POST


Send [[barcode,routeId,shopId]]

when single box added

[["#456789456",3,2,"2020-07-02"]] "YYYY-MM-DD" Send Current date

when multiple box added 

[["#456789456",3,2,"2020-07-02"],
["#456789456",3,4,"2020-07-02"]]

Response :- 
{
    "success": 1,
    "message": "Successfull"
}

12) baseUrl/route/assigndeliveryman

=========================== FOR route/assigndeliveryman  ================================

Request Type:- POST

routeId*
deliverymanId*
vehicleId*
starting_miles*

Response :-

{
    "success": 1,
    "message": "Successfull"
}

13) basUrl/delivery/getDeliverymanRoute

========================== for delivery/getDeliverymanRoute ==========================

Request type :- GET

deliverymanId*

Response:-

{
    "success": 1,
    "message": "Successfull",
    "data": [
        {
            "route_name": "Route #3",
            "routeId": 9,
            "assignRouteId": 3,
            "starting_miles": "3300",
            "end_miles": "0",
            "assign_route_date": "2020-08-08",
            "status": 0,
            "totes": 12,
            "customer": 4
        }
    ]
}


14) basUrl/delivery/showdeliveryManShop

========================== for delivery/showdeliveryManShop ==========================

Request type :- GET

routeId*
deliverymanId*

Response:-

{
    "success": 1,
    "message": "Successfull",
    "data": [
        {
            "shopId": 1,
            "shop_name": "Amit Cloth",
            "shop_address": "#453, Abrol Nagar, Mohali, Punjab",
            "shop_email": "abc@gmail.com",
            "shop_mobile_number": "8998676678",
            "created_at": "2020-07-26T17:05:48.000Z",
            "delivery_done": 0,
            "TodayTotes": 0,
            "PreviousTotes": 6,
            "routeId": 1
        },
        {
            "shopId": 3,
            "shop_name": "Atul Mobile Shop",
            "shop_address": "#453, Abrol Nagar, Mohali, Punjab",
            "shop_email": "abc@gmail.com",
            "shop_mobile_number": "8998676678",
            "created_at": "2020-07-27T18:38:41.000Z",
            "delivery_done": 1,
            "TodayTotes": 0,
            "PreviousTotes": 3,
            "routeId": 1
        }
    ]
}

15) basUrl/delivery/showTotesByShop

========================== for delivery/showTotesByShop ==========================

Request type :- GET

routeId*
shopId*

Response:-

{
    "success": 1,
    "message": "Successfull",
    "data": [
        {
            "assigTotesId": 15,
            "barcode": "7645663",
            "isDelivered": 0,
            "isReturned": 0,
            "updated_date": "",
            "totes_assign_date": "2020-08-02"
        },
        {
            "assigTotesId": 17,
            "barcode": "11111",
            "isDelivered": 0,
            "isReturned": 0,
            "updated_date": "",
            "totes_assign_date": "2020-08-02"
        },
        {
            "assigTotesId": 18,
            "barcode": "22222",
            "isDelivered": 0,
            "isReturned": 0,
            "updated_date": "",
            "totes_assign_date": "2020-08-02"
        }
    ]
}

16) baseUrl/admin/admin_login

=========================== FOR  admin_login  ================================

Request Type:- POST

Format :- x-www-form-urlencoded

all parameter mandatory

admin_email*
admin_password*

Response :-

{
    "success": 1,
    "message": "Successfull"
}

17) basUrl/admin/admin_buyers

=================== FOR admin_buyers ==========================

Request GET :-

Response :-

{
    "success": 1,
    "message": "Successfull",
    "data": [
        {
            "shopId": 1,
            "shop_name": "Amit Cloth",
            "shop_address": "#453, Abrol Nagar, Mohali, Punjab",
            "shop_email": "abc@gmail.com",
            "shop_mobile_number": "8998676678",
            "created_at": "2020-07-26T17:05:48.000Z",
            "outforDelivery": 2,
            "received_back": 1,
            "routeId": 1,
            "missing": 1
        },
        {
            "shopId": 2,
            "shop_name": "Vijay Cloth",
            "shop_address": "#453, Abrol Nagar, Mohali, Punjab",
            "shop_email": "abc@gmail.com",
            "shop_mobile_number": "8998676678",
            "created_at": "2020-07-27T18:38:24.000Z",
            "outforDelivery": 1,
            "received_back": 0,
            "routeId": 2,
            "missing": 1
        },
        {
            "shopId": 3,
            "shop_name": "Atul Mobile Shop",
            "shop_address": "#453, Abrol Nagar, Mohali, Punjab",
            "shop_email": "abc@gmail.com",
            "shop_mobile_number": "8998676678",
            "created_at": "2020-07-27T18:38:41.000Z",
            "outforDelivery": 3,
            "received_back": 0,
            "routeId": 1,
            "missing": 3
        }
    ]
}

18) basUrl/admin/admin_deliveryman

=================== FOR admin/admin_deliveryman ==========================

Request GET :-

Response :-


{
    "success": 1,
    "message": "Successfull",
    "data": [
        {
            "deliverymanId": 2,
            "deliveryman_name": "Mohit",
            "deliveryman_email": "xyz@gmail.com",
            "deliveryman_mobile_number": "8998676678",
            "deliveryman_password": "$2a$10$85zujfu0iRPsLbumVNa3/uPjPWDd8kfV3ldeNtw0VylzUUbBIUm1q",
            "created_at": "2020-07-26T17:33:03.000Z",
            "totalstoresassigned": 2,
            "outforDelivery": 8,
            "received_back": 1,
            "routeId": 1,
            "missing": 7
        },
        {
            "deliverymanId": 5,
            "deliveryman_name": "Vijay",
            "deliveryman_email": "abcz@gmail.com",
            "deliveryman_mobile_number": "8998676678",
            "deliveryman_password": "$2a$10$85zujfu0iRPsLbumVNa3/uPjPWDd8kfV3ldeNtw0VylzUUbBIUm1q",
            "created_at": "2020-07-30T18:21:43.000Z",
            "totalstoresassigned": 1,
            "outforDelivery": 2,
            "received_back": 0,
            "routeId": 2,
            "missing": 2
        }
    ]
}

19) basUrl/delivery/delivery_isDelivered

=================== FOR delivery/delivery_isDelivered ==========================

Request Post :-

totesId* (Send like this 1,2,7,8)

Response :-

{
    "success": 1,
    "message": "Successfull"
}

21) basUrl/delivery/delivery_isReturned

=================== FOR delivery/delivery_isReturned ==========================

Request Post :-

totesId* (Send like this 1,2,7,8)

Response :-

{
    "success": 1,
    "message": "Successfull"
}

22) basUrl/route/deleteTotes

=================== FOR route/deleteTotes ==========================

Request Post :-

assigTotesId*

Response :-

{
    "success": 1,
    "message": "Successfull"
}
  
23) basUrl/admin/adminToteLogs

=================== FOR admin/adminToteLogs ==========================

Request GET :-



Response :-


{
    "success": 1,
    "message": "successfully",
    "data": [
        {
            "routeId": 1,
            "route_name": "Route #45",
            "created_at": "2020-07-26T17:46:15.000Z",
            "deliveryman_name": "Mohit",
            "deliverymanId": 2,
            "shop": [
                {
                    "shopId": 1,
                    "shop_name": "Amit Cloth",
                    "shop_address": "#453, Abrol Nagar, Mohali, Punjab",
                    "shop_email": "abc@gmail.com",
                    "shop_mobile_number": "8998676678",
                    "created_at": "2020-07-26T17:05:48.000Z",
                    "TodayTotes": 0,
                    "PreviousTotes": 6,
                    "missing": -6
                },
                {
                    "shopId": 3,
                    "shop_name": "Atul Mobile Shop",
                    "shop_address": "#453, Abrol Nagar, Mohali, Punjab",
                    "shop_email": "abc@gmail.com",
                    "shop_mobile_number": "8998676678",
                    "created_at": "2020-07-27T18:38:41.000Z",
                    "TodayTotes": 1,
                    "PreviousTotes": 2,
                    "missing": -1
                }
            ]
        },
        {
            "routeId": 2,
            "route_name": "Route #46",
            "created_at": "2020-07-26T17:47:01.000Z",
            "deliveryman_name": "Vijay",
            "deliverymanId": 5,
            "shop": [
                {
                    "shopId": 2,
                    "shop_name": "Vijay Cloth",
                    "shop_address": "#453, Abrol Nagar, Mohali, Punjab",
                    "shop_email": "abc@gmail.com",
                    "shop_mobile_number": "8998676678",
                    "created_at": "2020-07-27T18:38:24.000Z",
                    "TodayTotes": 1,
                    "PreviousTotes": 2,
                    "missing": -1
                }
            ]
        },
        {
            "routeId": 3,
            "route_name": "Route #47",
            "created_at": "2020-07-26T17:49:22.000Z",
            "deliveryman_name": " ",
            "deliverymanId": 0,
            "shop": []
        }
    ]
}


24) basUrl/Track/route/add_amount

=================== FOR Track/route/add_amount ==========================

Request POST :-

routeId*
shopId*
amount*

Response:-


{
    "success": 1,
    "message": "Successfull",
    "data": {
        "routeId": "1",
        "shopId": "3",
        "amount": "500",
        "invoice_date": "2020-08-05",
        "invoice_amountId": 1
    }
}

25) basUrl/Track/delivery/delivery_payment

=================== FOR Track/delivery/delivery_payment ==========================

Request POST:- 

"MULITPART"

routeId*
shopId*
paid_amount*
payment_mode (1 for cash 2 for checque)
payment_number*
payment_date*
deliverymanId*
customer_signature* (file)
payment_sign* (file)

Response:-

{
    "success": 1,
    "message": "Successfull"
}



26) basUrl/Track/admin/adminpaymentLogs

=================== FOR Track/admin/adminpaymentLogs ==========================

Request GET:-

{
    "success": 1,
    "message": "successfully",
    "data": [
        {
            "routeId": 1,
            "route_name": "Route #45",
            "created_at": "2020-07-26T17:46:15.000Z",
            "shop": [
                {
                    "shopId": 1,
                    "shop_name": "Amit Cloth",
                    "shop_address": "#453, Abrol Nagar, Mohali, Punjab",
                    "shop_email": "abc@gmail.com",
                    "shop_mobile_number": "8998676678",
                    "created_at": "2020-07-26T17:05:48.000Z",
                    "cheque_collected": 0,
                    "cash_collected": 560,
                    "payment_mode": null,
                    "payment_number": null,
                    "inv_amount": 800,
                    "total_paid_amount": 560,
                    "paid_amount": "560",
                    "amount": 800,
                    "due": 240
                },
                {
                    "shopId": 3,
                    "shop_name": "Atul Mobile Shop",
                    "shop_address": "#453, Abrol Nagar, Mohali, Punjab",
                    "shop_email": "abc@gmail.com",
                    "shop_mobile_number": "8998676678",
                    "created_at": "2020-07-27T18:38:41.000Z",
                    "cheque_collected": 450,
                    "cash_collected": 10,
                    "payment_mode": null,
                    "payment_number": null,
                    "inv_amount": 550,
                    "total_paid_amount": 460,
                    "paid_amount": "450",
                    "amount": 550,
                    "due": 90
                }
            ]
        },
        {
            "routeId": 2,
            "route_name": "Route #46",
            "created_at": "2020-07-26T17:47:01.000Z",
            "shop": [
                {
                    "shopId": 2,
                    "shop_name": "Vijay Cloth",
                    "shop_address": "#453, Abrol Nagar, Mohali, Punjab",
                    "shop_email": "abc@gmail.com",
                    "shop_mobile_number": "8998676678",
                    "created_at": "2020-07-27T18:38:24.000Z",
                    "cheque_collected": 0,
                    "cash_collected": 0,
                    "payment_mode": null,
                    "payment_number": null,
                    "inv_amount": 0,
                    "total_paid_amount": 0,
                    "paid_amount": null,
                    "amount": null,
                    "due": 0
                }
            ]
        },
        {
            "routeId": 3,
            "route_name": "Route #47",
            "created_at": "2020-07-26T17:49:22.000Z",
            "shop": []
        }
    ]
}

27) basUrl/Track/route/update_amount

=================== FOR Track/route/update_amount ==========================

Request POST:-

invoice_amountId*
amount*

Response:- 

{
    "success": 1,
    "message": "Successfull",
    "data": {
        "invoice_amountId": 1,
        "routeId": 1,
        "amount": 550,
        "shopId": 3,
        "invoice_date": "2020-08-05",
        "created_at": "2020-08-05T07:50:14.000Z"
    }
}


28) basUrl/Track/route/viewTotesShopAmount

=================== FOR /route/viewTotesShopAmount ==========================

Request GET:-

routeId*
shopId*

Response:-

{
    "success": 1,
    "message": "Successfull",
    "data": {
        "invoice_amountId": 1,
        "routeId": 1,
        "amount": 550,
        "shopId": 3,
        "invoice_date": "2020-08-05",
        "created_at": "2020-08-05T07:50:14.000Z"
    }
}

29) basUrl/Track/vehicle/add_vehicle

=================== FOR /vehicle/add_vehicle ==========================

Request POST:-

vehicle_name*
current_kms*

Response:-

{
    "success": 1,
    "message": "Successfull",
    "data": {
        "vehicleId": 1,
        "vehicle_name": "TATA 420",
        "current_kms": "3200",
        "created_at": "2020-08-08T18:56:15.000Z"
    }
}

30) basUrl/Track/vehicle/view_vehicles

=================== FOR /vehicle/view_vehicles ==========================

Request GET:-


Response:-

{
    "success": 1,
    "message": "successfully",
    "data": [
        {
            "vehicleId": 3,
            "vehicle_name": "Vehicle 1",
            "current_kms": "1234",
            "created_at": "2020-08-10T19:37:46.000Z",
            "shopvehiclelastKm": 0
        },
        {
            "vehicleId": 4,
            "vehicle_name": "vehicle 2",
            "current_kms": "32154",
            "created_at": "2020-08-10T19:38:11.000Z",
            "shopvehiclelastKm": 10767
        },
        {
            "vehicleId": 5,
            "vehicle_name": "Mini truck",
            "current_kms": "524466",
            "created_at": "2020-08-11T04:54:58.000Z",
            "shopvehiclelastKm": -58788
        }
    ]
}

31) basUrl/Track/vehicle/updateEndMiles

=================== FOR vehicle/vehicle_logs ==========================

Request POST:-

assignRouteId*
end_miles*
routeId* new parmeter

Response :-

{
    "success": 1,
    "message": "Successfull"
}

32) basUrl/Track/vehicle/vehicle_logs

=================== FOR vehicle/vehicle_logs ==========================

Request GET:-

vehicleId*

Response

{
    "success": 1,
    "message": "Successfull",
    "data": [
        {
            "route_name": "Route #45",
            "starting_miles": "800",
            "end_miles": "945",
            "route_kms": 145,
            "deliveryman_name": "Mohit"
        }
    ]
}

33) basUrl/Track/vehicle/updateStartMiles

=================== FOR vehicle/updateStartMiles ==========================

Request POST:-

assignRouteId*
start_miles*

Response :-

{
    "success": 1,
    "message": "Successfull"
}

34) basUrl/Track/delivery/updateStartDelivery

=================== FOR delivery/updateStartDelivery ==========================

Request POST:-

assignRouteId*



Response :-

{
    "success": 1,
    "message": "Successfull"
}

35) baseUrl/delivery/edit_deliveryman

=========================== FOR  delivery edit_deliveryman  ================================

Request Type:- POST

Format :- x-www-form-urlencoded

all parameter mandatory


deliverymanId*

deliveryman_name*
deliveryman_email*
deliveryman_mobile_number*
deliveryman_password*

Response :-

{
    "success": 1,
    "message": "Successfull",
    "data": {
        "deliverymanId": 2,
        "deliveryman_name": "Amit ",
        "deliveryman_email": "abc@gmail.com",
        "deliveryman_mobile_number": "8998676678",
        "created_at": "2020-07-26T17:33:03.000Z"
    }
}

36) baseUrl/shop/edit_shop

=========================== FOR  edit_shop  ================================

Request Type:- POST

Format :- x-www-form-urlencoded

all parameter mandatory

shopId*

shop_name
shop_address*
shop_email*
shop_mobile_number*

Response :-

{
    "success": 1,
    "message": "Successfull",
    "data": {
        "shopId": 1,
        "shop_name": "Amit Cloth",
        "shop_address": "#453, Abrol Nagar, Mohali, Punjab",
        "shop_email": "abc@gmail.com",
        "shop_mobile_number": "8998676678",
        "created_at": "2020-07-26T17:05:48.000Z"
    }
}


37) baseUrl/route/deleteRoute

=========================== FOR  delete route  ================================

Request Type:- POST

Format :- x-www-form-urlencoded

all parameter mandatory

routeId*

Response :-

{
    "success": 1,
    "message": "Successfull",
}

38) baseUrl/delivery/delete_deliveryman

=========================== FOR  delete   ================================

Request Type:- POST

Format :- x-www-form-urlencoded

all parameter mandatory

deliverymanId*

Response :-

{
    "success": 1,    
    "message": "Successfull",
}

39) baseUrl/shop/delete_shop

=========================== FOR  delete route  ================================

Request Type:- POST

Format :- x-www-form-urlencoded

all parameter mandatory

deliverymanId*

Response :-

{
    "success": 1,
    "message": "Successfull",
}
