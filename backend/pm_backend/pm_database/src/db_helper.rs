use actix_web::web;
use deadpool_postgres::{Client, Pool};
use pm_errors::APIError;
use tokio_pg_mapper::FromTokioPostgresRow;
use tokio_postgres::types::ToSql;

pub async fn query_one<T: FromTokioPostgresRow>(
    client: &Client,
    statement: &str,
    params: &[&(dyn ToSql + Sync)],
    error: APIError,
) -> Result<T, APIError> {
    let stmt = client.prepare(&statement).await?;

    //Get one row, if there's none, return with error
    let row = client.query_one(&stmt, params).await.map_err(|_| error)?;

    //Row was found --> convert it to type
    Ok(T::from_row(row)?)
}

pub async fn query_one_map<T, M>(
    client: &Client,
    statement: &str,
    params: &[&(dyn ToSql + Sync)],
    error: APIError,
    mapper: M,
) -> Result<T, APIError> 
    where M: Fn(&tokio_postgres::Row) -> Result<T, APIError>
{
    let stmt = client.prepare(&statement).await?;

    //Get one row, if there's none, return with error
    let row = client.query_one(&stmt, params).await.map_err(|_| error)?;

    //Row was found --> convert it to type
    Ok(mapper(&row)?)
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

pub async fn query_multiple_map<T, M>(
    client: &Client,
    statement: &str,
    params: &[&(dyn ToSql + Sync)],
    mapper: M,
) -> Result<Vec<T>, APIError> 
    where M: Fn(&tokio_postgres::Row) -> Result<T, APIError>
{
    let stmt = client.prepare(statement).await?;

    Ok(client
        .query(&stmt, params)
        .await?
        .iter()
        .map(|row| mapper(row).unwrap())
        .collect::<Vec<T>>())
}

pub async fn get_db_client(pool: &web::Data<Pool>) -> Result<Client, APIError> {
    pool.get().await.map_err(|_| APIError::PGError)
}

/*
    Result<String, TestError>
        * map: Result<MyStruct, TestError>
        * map_error: Result<String, RealError>
*/
