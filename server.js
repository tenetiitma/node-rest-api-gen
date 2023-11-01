import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.get('/', (request, response) => {
    response.status(200).send('Welcome');
});

app.get('/books', async (request, response) => {
    try {
        const books = await prisma.books.findMany();
        response.status(200).json(books);
    } catch (error) {
        console.log(error);
        response.status(400).send({
            message: "Midagi läks valesti. Proovi uuesti!",
        });
    }

});

app.get('/books/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const book = await prisma.books.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!book) {
            throw new Error("Raamatut ei leitud!");
        }

        response.status(200).json(book);

    } catch (error) {
        console.log(error);
        response.status(400).send({
            message: error.message,
        });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
});
