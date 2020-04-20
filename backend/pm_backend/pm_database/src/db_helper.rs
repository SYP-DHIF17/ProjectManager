use deadpool_postgres::Client;
use tokio_pg_mapper::FromTokioPostgresRow;
use tokio_postgres::types::ToSql;
use pm_errors::APIError;

pub async fn query_one<T: FromTokioPostgresRow>(
    client: &Client,
    statement: &str,
    params: &[&(dyn ToSql + Sync)],
    error: APIError,
) -> Result<T, APIError> {
    let stmt = client.prepare(&statement).await?;

    //Get one row, if there's none, return with error
    let row = client
        .query_one(&stmt, params)
        .await
        .map_err(|_| error)?;

    //Row was found --> convert it to type
    Ok(T::from_row(row)?)
}

pub async fn query_none(
    client: &Client,
    statement: &str,
    params: &[&(dyn ToSql + Sync)],
) -> Result<(), APIError> {
    let stmt = client.prepare(&statement).await?;
    client.query_opt(&stmt, params).await?;
    Ok(())
}

pub async fn query_multiple<T: FromTokioPostgresRow>(
    client: &Client,
    statement: &str,
    params: &[&(dyn ToSql + Sync)],
) -> Result<Vec<T>, APIError> {
    let stmt = client.prepare(statement).await?;

    Ok(client
        .query(&stmt, params)
        .await?
        .iter()
        .map(|row| T::from_row_ref(row).unwrap())
        .collect::<Vec<T>>())
}
