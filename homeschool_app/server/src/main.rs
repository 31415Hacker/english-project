use axum::{routing::{get,post}, Json, Router};
use serde::{Deserialize,Serialize};
use tower_http::cors::CorsLayer;
#[derive(Deserialize)] struct Learner { name:String, age:String, interests:Vec<String>, goal:String, weekly_hours:u8 }
#[derive(Serialize)] struct Recommendation { pace:String, message:String, subjects:Vec<String> }
async fn health()->&'static str { "Pathfinder API ready" }
async fn recommend(Json(p):Json<Learner>)->Json<Recommendation>{
 let pace=if p.goal=="Catch up on foundations" {"4 focused sessions"} else {"3 sessions + 1 project"};
 Json(Recommendation{pace:pace.into(),message:format!("A flexible plan for {} (age {}).",p.name,p.age),subjects:p.interests})
}
#[tokio::main] async fn main(){let app=Router::new().route("/health",get(health)).route("/api/recommendations",post(recommend)).layer(CorsLayer::permissive());let l=tokio::net::TcpListener::bind("127.0.0.1:3001").await.unwrap();axum::serve(l,app).await.unwrap();}
