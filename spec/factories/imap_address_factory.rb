FactoryGirl.define do
  factory :imap_address do
    server "imap.gmail.com"
    password "password"
    port 993
    sequence(:email) {|i| "user#{i}@example.com" }
    ssl true
    after(:build) {|i|
      i.user ||= FactoryGirl.create(:user)
    }
  end
end
