use serde::Deserialize;

#[derive(Deserialize, Debug)]
struct Comment<'a> {
    id: u32,
    text: &'a str,
}

fn main() {
    let data: Vec<Comment> =
        serde_json::from_str(r#"[{"id": 345213,"text": "Hello world!"}]"#).unwrap();
    println!("{:?}", data);
}
