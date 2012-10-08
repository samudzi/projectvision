FactoryGirl.define do
  factory :user do
    sequence(:email) {|i| "hemant#{i}@example.com" }
    password "password"
    user_name "gnufied"
    is_admin false
  end
end
