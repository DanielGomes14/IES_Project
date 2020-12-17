package ies.proj.geanihouse.model;

import lombok.*;

@Getter @Setter
public class Transaction {
    int orderId;
    int itemId;
    int orderQty;
    String region;

    public Transaction() {
    }

    public Transaction(int orderId, int itemId, int orderQty, String region) {
        super();
        this.orderId = orderId;
        this.itemId = itemId;
        this.orderQty = orderQty;
        this.region = region;
    }
}