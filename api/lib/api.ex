defmodule Api do
  @moduledoc """
  Context
  """

  @spec get(binary()) :: any
  def get(username) do
    username
    |> get_data_from_cache?()
    |> fetch_data?()
    |> put_in_cache?(username)
  end

  defp get_data_from_cache?(username) do
    {:ok, result} =
      :poolboy.transaction(
        :worker,
        fn pid ->
          GenServer.call(pid, {:get, username})
        end
      )

    {:ok, result, username}
  end

  defp fetch_data?({:ok, nil, username}) do
    result = Api.Github.get(username)
    {:ok, result, :not_in_cache}
  end

  defp fetch_data?({:ok, data, _username}) do
    {:ok, data, :in_cache}
  end

  defp put_in_cache?({:ok, data, :not_in_cache}, username) do
    {:ok, _result} =
      :poolboy.transaction(
        :worker,
        fn pid ->
          GenServer.call(pid, {:put, username, data |> Jason.encode!()})
        end
      )

    {:ok, data}
  end

  defp put_in_cache?({:ok, data, :in_cache}, _username) do
    {:ok, data}
  end
end
