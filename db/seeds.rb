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


@contest1 = Contest.create!(name: "Hello", category: "cocktails", rules: Faker::Lorem.sentence(word_count: 10), ending_time: DateTime.strptime("10/20/1999 17:00", "%m/%d/%Y %H:%M"), user: @admin)
@contest2 = Contest.create!(name: "Bye", category: "nope", rules: Faker::Lorem.sentence(word_count: 15), ending_time: DateTime.strptime("1/12/2021 17:00", "%m/%d/%Y %H:%M"), user: @daniel)

puts "#{Contest.count} contests created"

@submission1 = Submission.create!(name: "Tequila Sunrise Cocktail", content: Faker::Lorem.sentence(word_count: 30), file: "https://www.thespruceeats.com/thmb/8w9Zmdiva5L23O_HJhjgYC-jKEU=/1365x1365/smart/filters:no_upscale()/tequila-sunrise-recipe-760754-19_preview-5b02f856119fa80037651942.jpeg", user: @admin, contest: @contest1)
@submission2 = Submission.create!(name: "Rainbow Paradise Cocktail", rules: Faker::Lorem.sentence(word_count: 15), ending_time: DateTime.strptime("1/12/2021 17:00", "%m/%d/%Y %H:%M"), user: @daniel, contest: @contest1)
@submission3 = Submission.create!(name: "Rainbow Paradise Cocktail", rules: Faker::Lorem.sentence(word_count: 15), ending_time: DateTime.strptime("1/12/2021 17:00", "%m/%d/%Y %H:%M"), user: @daniel, contest: @contest2)

puts "#{Submission.count} submissions created"

@vote1 = Vote.create!(user: @daniel, submission: @submission1)
@vote2 = Vote.create!(user: @admin, submission: @submission1)
@vote3 = Vote.create!(user: @daniel, submission: @submission2)

puts "#{Vote.count} votes created"

