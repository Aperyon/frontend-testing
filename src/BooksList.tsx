import { useTranslation } from "react-i18next";
import { useBooks } from "./books-api";

export default function BooksList() {
  const { t } = useTranslation();
  const { data: booksData, isLoading: areBooksLoading } = useBooks();

  if (areBooksLoading) return <h1>Loading...</h1>;

  const books = booksData?.data || [];

  return (
    <div>
      <h1>{t("booksListPageTitle")}</h1>

      <ul>
        {books.map((book) => (
          <li key={book.url}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
}
