import { SignJWT } from "jose";

// generate a jwt token with HS256 algorithm
// the payload can be set if website has backend to verify the token
// for now, the payload is empty
export function generateBindingToken() {
	const token = new SignJWT({})
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setIssuer(process.env.WEBSITE_URL)
		.setAudience(process.env.WEBSITE_URL)
		.sign(new TextEncoder().encode(process.env.JWT_SECRET));

	return token;
}
