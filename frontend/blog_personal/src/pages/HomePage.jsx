import { useFetch } from "../hooks/useFetch";

export const HomePage = () => {
  const { data: articles, isLoading, error } = useFetch(
    "http://localhost:3000/api/articles",
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#FDF1E2]">
      <h1 className="text-3xl font-bold text-[#AB92BF] mb-6">
        Artículos Publicados
      </h1>

      {isLoading && (
        <p className="text-[#AB92BF] font-semibold">Cargando artículos...</p>
      )}

      {error && (
        <p className="text-red-500 bg-red-100 p-3 rounded">Error: {error}</p>
      )}

      {!isLoading && !error && articles && articles.length === 0 && (
        <p className="text-[#AB92BF]">
          No hay artículos disponibles por el momento.
        </p>
      )}

      <div className="grid gap-6">
        {articles &&
          articles.map((article) => (
            <article
              key={article.id}
              className="bg-white p-6 rounded-lg shadow-md border border-[#AB92BF]"
            >
              <h2 className="text-2xl font-bold text-[#AB92BF] mb-2">
                {article.title}
              </h2>
              <p className="text-[#655A7C] mb-4">
                {article.excerpt || article.content.substring(0, 150) + "..."}
              </p>
              <div className="flex justify-between items-center text-xs text-[#655A7C]">
                <span>
                  Autor:{" "}
                  {article.author ? article.author.username : "Desconocido"}
                </span>
                <span>
                  Fecha: {new Date(article.created_at).toLocaleDateString()}
                </span>
              </div>
            </article>
          ))}
      </div>
    </div>
  );
};
