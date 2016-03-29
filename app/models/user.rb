class User < ActiveRecord::Base
	validates :email, :password_digest, :session_token, presence: true
	validates :password, length: ( minimum: 6, maximum: 60, allow_nil: true)
	before_validation :ensure_session_token
	attr_reader :password

	def self.generate_session_token
		token = SecureRandom.urlsafe_base64(16)
		while User.find_by_session_token(token)
			token = SecureRandom.urlsafe_base64(16)
		end
		return token
	end

	def self.find_by_credentials(email, password)
		user = user.find_by_email(email)
		return nil unless user && user.valid_password?(password)
		user
	end

	def password=(password)
		@password = password
		self.password_digest = BCrypt::Password.create(password)
	end

	def valid_password?(password)
		BCrypt::Password.new(self.password_digest).is_password?(password)
	end

	def reset_session_token!
		user.session_token = self.generate_session_token
		user.save!
	end

	private

	def ensure_session_token
		user.session_token ||= self.generate_session_token
	end

end
