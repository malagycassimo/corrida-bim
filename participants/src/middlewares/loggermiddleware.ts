import type { Request, Response, NextFunction } from "express";

export const loggerMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const ip = req.ip;
    const userAgent = req.headers["user-agent"];

    // Log da requisição
    console.log(`[${timestamp}] ${method} ${url}`);
    console.log(`IP: ${ip}`);
    console.log(`User-Agent: ${userAgent}`);

    if (Object.keys(req.body).length > 0) {
        console.log("Body:", JSON.stringify(req.body, null, 2));
    }

    // Captura o tempo de resposta
    const start = Date.now();

    // Quando a resposta for enviada
    res.on("finish", () => {
        const duration = Date.now() - start;
        const status = res.statusCode;

        console.log(
            `[${timestamp}] ${method} ${url} - Status: ${status} - Duration: ${duration}ms`,
        );
        console.log("----------------------------------------");
    });

    next();
};
