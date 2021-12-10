defmodule Api.Github do
  @moduledoc false

  @spec get(binary()) :: binary()
  def get(username) do
    Req.build(:get, "https://api.github.com/users/#{username}")
    |> Req.run!()
    |> Map.get(:body)
  end
end
