-- sql seed data here
-- move to root /data for submission

-- MoneyPool
-- For AGGRESSIVE portfolio
INSERT INTO money_pool (portfolio_type, pool_balance, unit_price, total_unit_qty)
VALUES ('AGGRESSIVE', 1000000.00, 100.00, 10000);

-- For MODERATE portfolio
INSERT INTO money_pool (portfolio_type, pool_balance, unit_price, total_unit_qty)
VALUES ('MODERATE', 1000000.00, 100.00, 10000);

-- For CONSERVATIVE portfolio
INSERT INTO money_pool (portfolio_type, pool_balance, unit_price, total_unit_qty)
VALUES ('CONSERVATIVE', 1000000.00, 100.00, 10000);

UPDATE money_pool
SET pool_balance = 1000000.00,
    unit_price = 100.00,
    total_unit_qty = 10000;
-- Ticker
INSERT INTO ticker (id, ticker_name, ticker_type, portfolio_type)
VALUES (1, 'AAPL', 'STOCKS', 'AGGRESSIVE');

INSERT INTO ticker (id, ticker_name, ticker_type, portfolio_type)
VALUES (2, 'AAPL', 'STOCKS', 'MODERATE');

INSERT INTO ticker (id, ticker_name, ticker_type, portfolio_type)
VALUES (3, 'AAPL', 'STOCKS', 'CONSERVATIVE');

INSERT INTO ticker (id, ticker_name, ticker_type, portfolio_type)
VALUES (4, 'GOOGL', 'STOCKS', 'AGGRESSIVE');

INSERT INTO ticker (id, ticker_name, ticker_type, portfolio_type)
VALUES (5, 'GOOGL', 'STOCKS', 'MODERATE');

INSERT INTO ticker (id, ticker_name, ticker_type, portfolio_type)
VALUES (6, 'GOOGL', 'STOCKS', 'CONSERVATIVE');

INSERT INTO ticker (id, ticker_name, ticker_type, portfolio_type)
VALUES (7, 'NVDA', 'STOCKS', 'AGGRESSIVE');

INSERT INTO ticker (id, ticker_name, ticker_type, portfolio_type)
VALUES (8, 'NVDA', 'STOCKS', 'MODERATE');

INSERT INTO ticker (id, ticker_name, ticker_type, portfolio_type)
VALUES (9, 'NVDA', 'STOCKS', 'CONSERVATIVE');

INSERT INTO ticker (id, ticker_name, ticker_type, portfolio_type)
VALUES (10, 'X:BTCUSD', 'CRYPTO', 'AGGRESSIVE');

INSERT INTO ticker (id, ticker_name, ticker_type, portfolio_type)
VALUES (11, 'X:BTCUSD', 'CRYPTO', 'MODERATE');

INSERT INTO ticker (id, ticker_name, ticker_type, portfolio_type)
VALUES (12, 'X:BTCUSD', 'CRYPTO', 'CONSERVATIVE');

INSERT INTO ticker (id, ticker_name, ticker_type, portfolio_type)
VALUES (13, 'X:ETHUSD', 'CRYPTO', 'AGGRESSIVE');

INSERT INTO ticker (id, ticker_name, ticker_type, portfolio_type)
VALUES (14, 'X:ETHUSD', 'CRYPTO', 'MODERATE');

INSERT INTO ticker (id, ticker_name, ticker_type, portfolio_type)
VALUES (15, 'X:ETHUSD', 'CRYPTO', 'CONSERVATIVE');