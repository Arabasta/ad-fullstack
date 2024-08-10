-- sql seed data here
-- move to root /data for submission

    /* Can't encrypt password with SQL statement
-- Register user
-- Insert into Address table
INSERT INTO address (id, street, city, postal_code, country, unit_no)
VALUES (1, '123 Main St', 'Sample City', '123456', 'Sample Country', '12A');

-- Insert into FinancialProfile table
INSERT INTO financial_profile (id, employment_status, annual_income, net_worth, source_of_wealth, investment_objective, investment_experience)
VALUES (1, 'EMPLOYED', 75000.00, 150000.00, 'SALARY', 'INCOME', 'NONE');

-- Insert into InvestorProfile table
INSERT INTO investor_profile (id, investment_duration_score, withdrawal_spending_plan_score, investment_knowledge_score, risk_reward_score, owned_investments_score, investment_personality_score, calculated_time_horizon_score, calculated_risk_tolerance_score, recommended_portfolio_type)
VALUES (1, 3, 2, 4, 2, 1, 3, 5, 10, 1);

-- Insert into Bank Details table
INSERT INTO bank_details (id, account_holder_name, account_number, bank_name)
VALUES(1, 'John Doe', 123456789, 'UOB');

-- Insert into Customer table
INSERT INTO customer (id,  financial_profile_id, investor_profile_id, bank_details_id, address_id, mobile_number, first_name, last_name, nationality)
VALUES (1, 1, 1, 1, 1, '1234567890', 'John', 'Doe', 'Sample Nationality');

-- Insert into User table
-- How to encrypt password without Spring Security?
INSERT INTO user (id, customer_id, role, username, password, email, create_date_time, update_date_time, is_deleted)
VALUES (1, 1, 'ROLE_CUSTOMER', 'testuser1', 'password123', 'testuser@example.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

-- Rule
INSERT INTO rule (id, recurring_allocation_amount, recurring_allocation_day, stop_loss_initial_value, stop_loss_percentage)
VALUES (1,null, null, null, null);

INSERT INTO rule (id, recurring_allocation_amount, recurring_allocation_day, stop_loss_initial_value, stop_loss_percentage)
VALUES (2,null, null, null, null);

INSERT INTO rule (id, recurring_allocation_amount, recurring_allocation_day, stop_loss_initial_value, stop_loss_percentage)
VALUES (3,null, null, null, null);
     */
-- MoneyPool
-- For AGGRESSIVE portfolio
INSERT INTO money_pool (portfolio_type, pool_balance, unit_price, total_unit_qty)
VALUES ('AGGRESSIVE', 1000000.00, 1.00, 1000000);

-- For MODERATE portfolio
INSERT INTO money_pool (portfolio_type, pool_balance, unit_price, total_unit_qty)
VALUES ('MODERATE', 1000000.00, 1.00, 1000000);

-- For CONSERVATIVE portfolio
INSERT INTO money_pool (portfolio_type, pool_balance, unit_price, total_unit_qty)
VALUES ('CONSERVATIVE', 1000000.00, 1.00, 1000000);

-- Ticker
INSERT INTO ticker (id, ticker_name, ticker_type, portfolio_type)
VALUES (1, 'AAPL', 'STOCK', 'AGGRESSIVE');

INSERT INTO ticker (id, ticker_name, ticker_type, portfolio_type)
VALUES (2, 'AAPL', 'STOCK', 'MODERATE');

INSERT INTO ticker (id, ticker_name, ticker_type, portfolio_type)
VALUES (3, 'AAPL', 'STOCK', 'CONSERVATIVE');

INSERT INTO ticker (id, ticker_name, ticker_type, portfolio_type)
VALUES (4, 'GOOGL', 'STOCK', 'AGGRESSIVE');

INSERT INTO ticker (id, ticker_name, ticker_type, portfolio_type)
VALUES (5, 'GOOGL', 'STOCK', 'MODERATE');

INSERT INTO ticker (id, ticker_name, ticker_type, portfolio_type)
VALUES (6, 'GOOGL', 'STOCK', 'CONSERVATIVE');

INSERT INTO ticker (id, ticker_name, ticker_type, portfolio_type)
VALUES (7, 'NVDA', 'STOCK', 'AGGRESSIVE');

INSERT INTO ticker (id, ticker_name, ticker_type, portfolio_type)
VALUES (8, 'NVDA', 'STOCK', 'MODERATE');

INSERT INTO ticker (id, ticker_name, ticker_type, portfolio_type)
VALUES (9, 'NVDA', 'STOCK', 'CONSERVATIVE');

INSERT INTO ticker (id, ticker_name, ticker_type, portfolio_type)
VALUES (10, 'X:BTC-USD', 'CRYPTO', 'AGGRESSIVE');

INSERT INTO ticker (id, ticker_name, ticker_type, portfolio_type)
VALUES (11, 'X:BTC-USD', 'CRYPTO', 'MODERATE');

INSERT INTO ticker (id, ticker_name, ticker_type, portfolio_type)
VALUES (12, 'X:BTC-USD', 'CRYPTO', 'CONSERVATIVE');

INSERT INTO ticker (id, ticker_name, ticker_type, portfolio_type)
VALUES (13, 'X:ETH-USD', 'CRYPTO', 'AGGRESSIVE');

INSERT INTO ticker (id, ticker_name, ticker_type, portfolio_type)
VALUES (14, 'X:ETH-USD', 'CRYPTO', 'MODERATE');

INSERT INTO ticker (id, ticker_name, ticker_type, portfolio_type)
VALUES (15, 'X:ETH-USD', 'CRYPTO', 'CONSERVATIVE');


-- Portfolio
-- For ALL portfolio
-- Register user with API first
UPDATE portfolio
SET allocated_balance = 100000,
    allocated_unit_qty = 100000,
    current_value = 100000;