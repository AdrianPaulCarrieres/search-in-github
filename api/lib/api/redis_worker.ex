defmodule Api.RedisWorker do
  use GenServer

  require Logger

  @ttl 5
  @redis_url "redis://localhost:6379/3"

  @moduledoc """
  Encapsulates a Redis conn.
  """

  def start_link(_) do
    GenServer.start_link(__MODULE__, nil)
  end

  def init(_) do
    {:ok, conn} = Redix.start_link(@redis_url)

    Logger.info("Starting Redis worker")
    {:ok, conn}
  end

  def handle_call({:put, key, value}, _from, conn) do
    result = Redix.command(conn, ["SETEX", key, @ttl, value])

    Logger.info("Put key #{key} in cache.")

    {:reply, result, conn}
  end

  def handle_call({:get, key}, _from, conn) do
    case Redix.command(conn, ["GET", key]) do
      {:ok, nil} = result ->
        Logger.info("Key #{key} not found in cache")
        {:reply, result, conn}

      {:ok, value} ->
        Logger.info("Found value in cache for key #{key}")
        {:reply, {:ok, Jason.decode!(value)}, conn}
    end
  end
end
