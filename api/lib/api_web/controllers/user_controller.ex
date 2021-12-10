defmodule ApiWeb.UserController do
  use ApiWeb, :controller

  action_fallback ApiWeb.FallbackController

  def get(conn, %{"username" => username}) do
    {:ok, result} = Api.get(username)

    json(conn, result |> Jason.decode!())
  end
end
