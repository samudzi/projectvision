module ApiMatchers
  extend RSpec::Matchers::DSL

  matcher :be_entity do |entity_name,value|
    match do |response|
      entity = Entity.const_get(entity_name)
      entity.represent(value).to_json == response.body
    end
    failure_message_for_should do |response|
      entity = Entity.const_get(entity_name)
      actual_json = entity.represent(value).to_json
      "Expected #{actual_json} got #{response.body}"
    end
  end

  matcher :contain do |key,value = nil|
    match do |response|
      json_response = JSON.parse(response.body)
      if value
        json_response.has_key?(key) && json_response[key] == value
      else
        if json_response.is_a?(Array)
          json_response.include?(key)
        else
          json_response.has_key?(key)
        end
      end
    end

    failure_message_for_should do |response|
      json_response = JSON.parse(response.body)
      if value
        "expected #{json_response.inspect} to include (#{key},#{value})"
      else
        "expected #{json_response.inspect} to include #{key}"
      end
    end
  end

  matcher :include_hash_with_key do |key,value = nil|
    match do |response|
      json_response = JSON.parse(response.body)
      if value
        json_response.any? { |t| t[key] == value }
      else
        json_response.any? { |t| t.has_key?(key) }
      end
    end
    failure_message_for_should do |response|
      json_response = JSON.parse(response.body)
      if value
        "expected #{json_response.inspect} to include (#{key},#{value})"
      else
        "expected #{json_response.inspect} to include #{key}"
      end
    end
  end
end

