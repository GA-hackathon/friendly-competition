# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'


User.destroy_all
Contest.destroy_all
Submission.destroy_all
Vote.destroy_all

@admin = User.create!(first_name: 'admin', last_name: "blah", email: 'admin@email.com', password: '12345678',image: "https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2020-07/kitten-510651.jpg?h=f54c7448&itok=ZhplzyJ9")
@daniel = User.create!(first_name: 'daniel', last_name: "m", email: 'daniel@email.com', password: '12345678',image: "")

puts "#{User.count} users created"


@contest1 = Contest.create!(name: "best cocktail", category: "cocktails", rules: Faker::Lorem.sentence(word_count: 10), ending_time: DateTime.strptime("10/20/1999 17:00", "%m/%d/%Y %H:%M"), picture: "https://static.vinepair.com/wp-content/uploads/2017/11/50-best-cocktails-inside.jpg" ,user: @admin)
@contest2 = Contest.create!(name: "Bye", category: "nope", rules: Faker::Lorem.sentence(word_count: 15), ending_time: DateTime.strptime("1/12/2021 17:00", "%m/%d/%Y %H:%M"), picture: "https://i.insider.com/5c2f4534ad9571412a2cb0c3?width=1067&format=jpeg", user: @daniel)
@contest3 = Contest.create!(name: "cool cocktail", category: "cocktails", rules: Faker::Lorem.sentence(word_count: 10), ending_time: DateTime.strptime("10/20/1999 17:00", "%m/%d/%Y %H:%M"), picture: "https://static.vinepair.com/wp-content/uploads/2017/11/50-best-cocktails-inside.jpg" ,user: @admin)
@contest4 = Contest.create!(name: "fine cocktail", category: "cocktails", rules: Faker::Lorem.sentence(word_count: 10), ending_time: DateTime.strptime("10/20/1999 17:00", "%m/%d/%Y %H:%M"), picture: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Lemon_Drop_cocktails.jpg/250px-Lemon_Drop_cocktails.jpg" ,user: @admin)
@contest5 = Contest.create!(name: "Best Rosemary Coffee Cocktail", category: "cocktails", rules: Faker::Lorem.sentence(word_count: 10), ending_time: DateTime.strptime("10/20/1999 17:00", "%m/%d/%Y %H:%M"), picture: "https://static.vinepair.com/wp-content/uploads/2017/11/50-best-cocktails-inside.jpg" ,user: @admin)
@contest6 = Contest.create!(name: "best cocktail", category: "cocktails", rules: Faker::Lorem.sentence(word_count: 10), ending_time: DateTime.strptime("10/20/1999 17:00", "%m/%d/%Y %H:%M"), picture: "https://images.pexels.com/photos/613037/pexels-photo-613037.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" ,user: @admin)
@contest7 = Contest.create!(name: "Bye", category: "D", rules: Faker::Lorem.sentence(word_count: 15), ending_time: DateTime.strptime("1/12/2021 17:00", "%m/%d/%Y %H:%M"), picture: "https://i.insider.com/5c2f4534ad9571412a2cb0c3?width=1067&format=jpeg", user: @daniel)
@contest8 = Contest.create!(name: "Hello", category: "d", rules: Faker::Lorem.sentence(word_count: 15), ending_time: DateTime.strptime("1/12/2022 17:00", "%m/%d/%Y %H:%M"), picture: "https://i.insider.com/5c2f4534ad9571412a2cb0c3?width=1067&format=jpeg", user: @daniel)
@contest9 = Contest.create!(name: "OKe", category: "ss", rules: Faker::Lorem.sentence(word_count: 15), ending_time: DateTime.strptime("1/10/2021 17:00", "%m/%d/%Y %H:%M"), picture: "https://i.insider.com/5c2f4534ad9571412a2cb0c3?width=1067&format=jpeg", user: @daniel)

puts "#{Contest.count} contests created"

@submission1 = Submission.create!(name: "Tequila Sunrise Cocktail", content: Faker::Lorem.sentence(word_count: 30), file: "https://www.thespruceeats.com/thmb/8w9Zmdiva5L23O_HJhjgYC-jKEU=/1365x1365/smart/filters:no_upscale()/tequila-sunrise-recipe-760754-19_preview-5b02f856119fa80037651942.jpeg", user: @admin, contest: @contest1)
@submission2 = Submission.create!(name: "Tequila Sunrise Cocktail 2", content: Faker::Lorem.sentence(word_count: 30), file: "https://www.thespruceeats.com/thmb/8w9Zmdiva5L23O_HJhjgYC-jKEU=/1365x1365/smart/filters:no_upscale()/tequila-sunrise-recipe-760754-19_preview-5b02f856119fa80037651942.jpeg", user: @admin, contest: @contest1)
@submission3 = Submission.create!(name: "Tequila Sunrise Cocktail 3", content: Faker::Lorem.sentence(word_count: 30), file: "https://www.thespruceeats.com/thmb/8w9Zmdiva5L23O_HJhjgYC-jKEU=/1365x1365/smart/filters:no_upscale()/tequila-sunrise-recipe-760754-19_preview-5b02f856119fa80037651942.jpeg", user: @admin, contest: @contest1)

puts "#{Submission.count} submissions created"

@vote1 = Vote.create!(user: @daniel, submission: @submission1)
@vote2 = Vote.create!(user: @admin, submission: @submission1)
@vote3 = Vote.create!(user: @daniel, submission: @submission2)

puts "#{Vote.count} votes created"

