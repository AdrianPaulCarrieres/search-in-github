defmodule ApiWeb.UserController do
  use ApiWeb, :controller

  action_fallback ApiWeb.FallbackController

  def get(conn, %{"username" => username}) do
    case Api.get(username) do
      {:ok, %{"message" => "Not Found"} = response} ->
        conn
        |> put_status(:not_found)
        |> json(response)
      {:ok, result} ->
        json(conn, result)
    end
  end
end
