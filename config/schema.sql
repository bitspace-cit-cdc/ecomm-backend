CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE category AS ENUM (
    'electronics',   
    'furnitures',   
    'handcrafts',   
);

CREATE TYPE payment_type AS ENUM (
    'card',   
    'cash',  
    'upi', 
);

CREATE TYPE delivery_status AS ENUM (
    'pending',
    'shipped',
    'delivered',
);

CREATE TYPE payment_status AS ENUM (
    'pending',
    'paid',
    'cancelled',
);

CREATE TABLE customers (
    customer_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,  
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    gender BOOLEAN DEFAULT TRUE,
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    product_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,  
    product_type category  NOT NULL,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    image_url VARCHAR(255),
);

CREATE TABLE orders (
    order_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,  
    customer_id UUID NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    delivery_status delivery_status DEFAULT 'pending',
    total_amount DECIMAL(10, 2) NOT NULL,
    shipping_address TEXT,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE order_items (
    order_item_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id UUID NOT NULL,
    product_id UUID NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE payments (
    payment_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, 
    order_id UUID NOT NULL,
    payment_method payment_type NOT NULL, 
    payment_status payment_status DEFAULT 'pending',
    amount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

create table staffs {
  	staff_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,  
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL UNIQUE,
	password_hash VARCHAR(255) NOT NULL,
	privilege ENUM('ADMIN', 'MANAGER', 'EMPLOYEE') NOT NULL DEFAULT 'EMPLOYEE',
	date_hired DATE NOT NULL,
}; 
