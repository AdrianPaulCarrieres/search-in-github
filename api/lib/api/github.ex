defmodule Api.Github do
  @moduledoc false

  @spec get(binary()) :: binary()
  def get(username) do
    Req.get!("https://api.github.com/users/#{username}") |> Map.get(:body)
  end
end
