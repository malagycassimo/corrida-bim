INSERT INTO "Setting" ("key", "value", "updatedAt")
VALUES
    ('route_limit_corrida_15k', '2000', CURRENT_TIMESTAMP),
    ('route_limit_caminhada_7k', '1000', CURRENT_TIMESTAMP)
ON CONFLICT ("key") DO NOTHING;