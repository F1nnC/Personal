---
title: JWT - Java, Security Lesson
author: david
categories: ['Lab Notebook']
tags: ['Java', 'Backend']
type: hacks
week: 17
description: JWTs Lesson
toc: True
comments: True
date: 2023-12-19 12:00:00 +0000
---

## What is JWT
- JSON Web Token (JWT)
    - popular way to authenticate users in a web application. It is a compact, URL-safe means of representing claims to be transferred between two parties. The claims in a JWT are encoded as a JSON object that is digitally signed using JSON Web Signature (JWS).
    - Compact, url safe means of representing claims to securely transmit information between parties.
        - These claims are encoded as JSON objects that are digitally signed using a JSON web signature
    - Concise and efficient representation, allows for ease of transmissions over networks
    - No need to reference external source/database to validate info
- Common use cases:
    - Authentication
    - information exchange
    - Authorization
    - Secure your APIs!

Popcorn hack: list 3 real world applications of JWT:
- logging into a website with secure password
- securing transactions with credit cards
- government information (user data)

## Why do you need JWT
JSON Web Tokens (JWT) are crucial for secure and efficient user authentication in web development. 
- They help manage user identity and sessions across different parts of a system. 
- They play a key role in stateless authentication, allowing servers to verify user identity without storing session data.
- JWTs are especially useful in decentralized systems, enabling smooth communication between different services and ensuring secure user roles and permissions. 
- JWTs simplify and enhance user authentication in modern web development.

<h1>Components of JWT</h1>

- What is a web token?
    - A web token is a piece of information that represents a user's identity or session and is used for authentication and authorization in web applications. It is typically a string of characters, often encoded in a JSON format, and is digitally signed to ensure its integrity.

- This is the structure of a JSON Web Token: 

1. Header
    - The header typically consists of two parts: the type of the token, which is JWT, and the algorithm that is used, such as HMAC SHA256 or RSA SHA256. It is Base64Url encoded to form the first part of the JWT
2. Payload
    - Claims and user data
    - claims are statements about the entity (users)
    - There are three types of claims: 
        - registered: predefined claims that are no mandatory but recommended
        - public: claims defined within the IA and JSON web token registry
        - private: custom claims created to share information between parties that agree to using them
3. Signature
    - Ensuring integrity and authenticity
    - verify the sender of the JWT
    - function
        - Creating a signature
        - Verification process
        - Signature tampering activity

<h1>Deep Dive into Anatomy of JWT</h1>

- Navigate to this website: [Link](https://jwt.io/)

Encoded: Json Web Token (what you send to and from the client)
Decoded: algorithm, data, verify token hasn't been changed


<span style="color:red;">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.<span style="color:purple;">eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.<span style="color:blue;">SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c


```java
// header
{
    "alg": "HS256", //type of sign in algorithm used for encoding and decoding
    "typ": "JWT"    //type of token
}
```

- Base 64 encoded
- useful to signature type to decode


```java
// payload
{
"sub": "123", //example of a registered claim
"name": "jwt lesson",
"iat": 1516239022",
"authorities": [
    "ADMIN",
    "MANAGER"
],
"extra-claims": "some data here"
}

```

- where all different data for applciation is
- sub = subject : id of user you're authenticating
- iat = issued at (when token was created)
- exp/eat = expired at (date when toke becomes invalid)


```java
//signature
{
HMACSHA256(
    base64UrlEncode(header) + "." +
    base64UrlEncode(payload),
    your-256-bit-secret
) secret base64 encoded
}
```

- verify user does not change with token before it is sent back to you
- input your secret key
- uses algorithm in header to encode data (header + payload) using specific secret key
- if header/payload is changed, signature will not match

Header


```java
import java.util.Base64;

public class JwtHeaderExample {
    public static void main(String[] args) {
        // JWT Header
        String algorithm = "HS256";
        String type = "JWT";

        // Combine Header properties
        String header = "{\"alg\":\"" + algorithm + "\",\"typ\":\"" + type + "\"}";

        // Base64 URL encode the header
        String base64UrlHeader = Base64.getUrlEncoder().encodeToString(header.getBytes());

        System.out.println("JWT Header: " + base64UrlHeader);
    }
}

// Run this code
JwtHeaderExample.main(null);

```

Payload


```java
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

public class JwtPayloadExample {
    public static void main(String[] args) {
        // JWT Payload (Claims)
        Map<String, Object> claims = new HashMap<>();
        claims.put("name", "Grace");
        claims.put("class", "CSA");
        claims.put("exp", System.currentTimeMillis() + 1800000); // 30 minutes expiration

        // Convert Claims to JSON and Base64 URL encode the payload
        String payload = mapToJson(claims);
        String base64UrlPayload = Base64.getUrlEncoder().encodeToString(payload.getBytes());

        System.out.println("JWT Payload: " + base64UrlPayload);
    }

    private static String mapToJson(Map<String, Object> map) {
        // Implement JSON conversion logic (use your preferred approach)
        return "{ \"customKey\": \"customValue\" }";
    }
}

// Run This Code
JwtPayloadExample.main(null);
```

Signature


```java
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

public class JwtSignatureExample {
    public static void main(String[] args) {
        // Secret key for encoding and decoding
        String secretKey = "your secret key";

        // Combine Header and Payload with a period '.'
        String base64UrlHeader = "base64UrlHeader"; // Placeholder for the actual base64UrlHeader
        String base64UrlPayload = "base64UrlPayload"; // Placeholder for the actual base64UrlPayload
        String headerPayload = base64UrlHeader + "." + base64UrlPayload;

        // Generate HMAC SHA-256 signature
        byte[] signature = HmacSha256(headerPayload, secretKey);

        // Base64 URL encode the signature
        String base64UrlSignature = Base64.getUrlEncoder().encodeToString(signature);

        System.out.println("JWT Signature: " + base64UrlSignature);
    }

    private static byte[] HmacSha256(String data, String key) {
        try {
            Mac sha256Hmac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            sha256Hmac.init(secretKey);
            return sha256Hmac.doFinal(data.getBytes(StandardCharsets.UTF_8));
        } catch (NoSuchAlgorithmException | InvalidKeyException e) {
            throw new RuntimeException("Error while generating HMAC SHA-256", e);
        }
    }
}

// Run
JwtSignatureExample.main(null);
```

<h3>Putting It Together</h3>

Popcorn hack: write some comments that identify each part of the JWT
- header
- payload
- signature
- algorithm
- secret key

etc


```java
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

public class JwtGenerator {

    public static void main(String[] args) {
        String secretKey = "yourSecretKey"; // secret key - encoding/decoding
        String subject = "userId123";
        long expirationTimeMillis = System.currentTimeMillis() + 3600000;

        String jwt = buildJwt(secretKey, subject, expirationTimeMillis);

        System.out.println("Generated JWT: " + jwt);
    }

    private static String buildJwt(String secretKey, String subject, long expirationTimeMillis) {
        // JWT header
        String header = "{\"alg\":\"HS256\",\"typ\":\"JWT\"}";
        // JWT payload
        String payload = "{\"sub\":\"" + subject + "\",\"iat\":" + System.currentTimeMillis() / 1000 +
                ",\"exp\":" + expirationTimeMillis / 1000 + "}";

        // Base64Url encoding of the JWT header and payload
        String encodedHeader = base64UrlEncode(header);
        String encodedPayload = base64UrlEncode(payload);

        // Concatenate the encoded JWT header and payload using dots
        String dataToSign = encodedHeader + "." + encodedPayload;
        
        // creating signature with HmacSHA256
        String signature = signData(dataToSign, secretKey);

        // Concatenate JWT header and payload with the signature with a dot to form the final JWT
        return dataToSign + "." + signature;
    }

    private static String base64UrlEncode(String input) {
        return Base64.getUrlEncoder().encodeToString(input.getBytes(StandardCharsets.UTF_8));
    }

    private static String signData(String data, String secretKey) {
        try {
            // Initialize HmacSHA256 with the secret key
            Mac sha256Hmac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKeySpec = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            sha256Hmac.init(secretKeySpec);
            
            // Generate the signature by applying HmacSHA256 on the data
            byte[] signature = sha256Hmac.doFinal(data.getBytes(StandardCharsets.UTF_8));
            
            // Base64Url encoding of the signature that was generated
            return base64UrlEncode(new String(signature, StandardCharsets.UTF_8));
        } catch (Exception e) {
            throw new RuntimeException("Error signing JWT", e);
        }
    }
}

JwtGenerator.main(null);
```

    Generated JWT: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VySWQxMjMiLCJpYXQiOjE3MDMwMDE3OTIsImV4cCI6MTcwMzAwNTM5Mn0=.24Tvv71877-9AQjvv71I77-977-977-977-9WO-_ve-_ve-_ve-_vQXvv73vv71bGe-_ve-_ve-_vSHbue-_vQ==


<h1> JWT with Spring Boot </h1>

<h2> Big Idea </h2>
<img alt="JWTProcess" src="{{site.baseurl}}/images/JwtProcess.png">

1. JwtAuthFilter is executed first (validates and checks JWT Tokens)
    - Internal check to check if the token is there or not. 
    - Extracts the subject (username or email)
    - If token is missing → 403 error sent
    - If token is there:
        - Makes a call using the UserDetails Service to fetch user info from the database. Uses the subject extracted to do so
        - Response comes back from the database (user either exists or doesn't)
        - If the user does not exist → 403 error sent
        - If user exists → validate JWT process is started

2. Validate JWT Process
- Calls the jwt service which takes the user and jwt token as parameters
- Token isn't valid → 403 error sent
- Token is valid → update the security context holder and set the connected user. User is now authenticated yay!
    - Automatically dispatch request → sent to dispatcher servlet → sent to controller → allow all execution user wants to do 
    - Sends http 200

Here is a diagram that makes it easier to understand the process tha happens between JWT and the API calls. 
<img alt="JWTApi" src="https://aliyatang.github.io/LessonJWT/images/JwtProcess.png">

- User posts with their login information
- server does authentication to confirm the user
- store the user in the memory of the server, send a corresponding ID with a cookie back to the client
- Now every time the user sends a request, the cookie with that corresponding ID gets send to the server which verifies the ID and sends back a response.

Popcorn Hack: Create your own diagram to help visualize the JWT process

<img src="{{ site.baseurl }}/assets/img/post_images/jwt.png">

<h2> JWT Walkthrough </h2>
- Clone this repo and follow along in each JWT file: https://github.com/vivianknee/jwtlessonBackend.git

<h3> Logic flow </h3>
<b>Step 1 (Client - Login Request):</b> The client sends a login request with user credentials (username and password) to the /authenticate endpoint.

<b>Step 2 (JwtApiController):</b>
- The JwtApiController receives the login request.
- It authenticates the user credentials using the AuthenticationManager.
- If authentication is successful:
Retrieves user details using the PersonDetailsService.
Generates a JWT using the JwtTokenUtil.
Sends the JWT as an HTTP-only secure cookie in the response.

<b>Step 3 (Client - Subsequent Requests):</b>
- The client includes the JWT cookie in the headers of subsequent requests.

<b>Step 4 (JwtRequestFilter):</b>
- For each incoming request, the JwtRequestFilter intercepts the request.
- Extracts the JWT from the HTTP request headers or cookies.
- Validates the JWT using the JwtTokenUtil.
- If the token is valid, sets up authentication using Spring Security's SecurityContextHolder.

<b>Step 5 (Spring Security):</b>
- Spring Security processes the request with the authenticated user.
- The application can now authorize the user based on the roles and permissions associated with the JWT.

<b>Step 6 (Error Handling - JwtAuthenticationEntryPoint):</b>
- If the JWT is missing, invalid, or expired, and the request requires authentication, the JwtAuthenticationEntryPoint handles the authentication failure.
- Responds with an HTTP 401 (Unauthorized) status.


## Storing JWT
There are a few different options for storing a JWT in a JavaScript application:

1. Cookies: You can store the JWT in a cookie and send it back to the server with each request. This is a simple and widely-supported option, but it has some limitations. For example, you can’t access cookies from JavaScript on a different domain, and some users may have cookies disabled in their browser settings.

2. Local storage: You can store the JWT in the browser’s local storage (localStorage) or session storage (sessionStorage). This option allows you to access the JWT from JavaScript on the same domain, but it is vulnerable to cross-site scripting (XSS) attacks, where an attacker can inject malicious code into your application and steal the JWT from the storage.

3. HttpOnly cookie: You can store the JWT in an HttpOnly cookie, which is a cookie that can only be accessed by the server and not by client-side JavaScript. This option provides some protection against XSS attacks, but it is still vulnerable to other types of attacks, such as cross-site request forgery (CSRF).

## Postman 
1. Trying to access /api/person/ without jwt token stored in Cookies
- <img alt="nojwt" src="https://aliyatang.github.io/LessonJWT/images/nojwt.png">

2. Trying to access /api/person/ with a wrong jwt token stored in Cookies
- <img alt="wrongjwt" src="https://aliyatang.github.io/LessonJWT/images/wrongjwt.png">

3. Trying to access /api/person/ with a jwt token that does not have the signature
- <img alt="nosignature" src="https://aliyatang.github.io/LessonJWT/images/nosignature.png">

4. Accessing /api/person/ with generated jwt token stored in Cookies header
- <img alt="yes" src="https://aliyatang.github.io/LessonJWT/images/yes.png">

## Implementation Approaches and Security Considerations

JWTs are signed to ensure they cannot be modified in transit. Signature is a crucial aspect of JWT security.

Key Usage
- Token Issuance: When the token is issued by the authorization server, it is signed with a key.
- Token Reception: When the client receives the token, the signature is validated using the key.


```java
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Claims;

public class TokenReceptionExample {

    // Simulate receiving a token from the client
    private static String receiveTokenFromClient() {
        // In a real scenario, this would be received from the client (e.g., from a request header)
        return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiAiMTIzIiwgImV4cCI6IDE2MjM5NzYzODF9.4X1lC5fU4dV1n9l02LZyGQSy5K-O5fnZM0t6eO-w2Qs";
    }

    public static void main(String[] args) {
        // Example of Token Reception
        String receivedToken = receiveTokenFromClient();
        System.out.println("Received Token: " + receivedToken);
    }
}
```

Symmetric vs. Asymmetric Key Approaches
- Symmetric Key: A single secret key is used both to sign and validate the token.
- Asymmetric Key: Different keys are used to sign and validate the token, only the authorization server has the ability to sign it.


```java
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.Keys;

import java.security.Key;

public class SymmetricKeyValidationExample {

    // Symmetric Key for Token Signing and Validation
    private static Key symmetricKey = Keys.secretKeyFor(io.jsonwebtoken.SignatureAlgorithm.HS256);

    // Token Validation with Symmetric Key
    private static Claims validateTokenSymmetric(String token) {
        try {
            // Parse and verify the token using the symmetric key and the HS256 algorithm
            Jws<Claims> claimsJws = Jwts.parserBuilder().setSigningKey(symmetricKey).build().parseClaimsJws(token);
            return claimsJws.getBody();
        } catch (ExpiredJwtException e) {
            // Handle case where the token has expired
            System.out.println("Token has expired");
        } catch (MalformedJwtException e) {
            // Handle case where the token is invalid (e.g., tampered with)
            System.out.println("Invalid token");
        }
        return null;
    }

    public static void main(String[] args) {
        // Example of Token Validation with Symmetric Key
        String receivedToken = receiveTokenFromClient();
        Claims validatedClaims = validateTokenSymmetric(receivedToken);
        if (validatedClaims != null) {
            System.out.println("Validated Payload: " + validatedClaims);
        }
    }
}
```

Additional Security Considerations
- Token Scope: limit token access to specific resources or actions
- Token Revocation: implement mechanism to revoke token if user's access needs to be taken away
- Token Encryption: encrypt token if it contains sensitive information that shouldn't be visible (even if intercepted)
- Regular Key Rotation: rotate keys regularly for security and to limit the impact of compromised key

## Hacks
1. Implementation 
- Implement a simple authentication system using JWT with Java. Show how JWT works with postman. Get the request to be authorized

2. MC Knowledge test (5) 
    - Which part of the JWT contains the actual data (claims)? 
        - Header
        - <mark>Payload<mark>
        - Signature
        - Encryption
    - What is the purpose of the header in a JWT?
        - It contains the signature for the JWT.
        - <mark>It identifies the algorithm used to generate the signature.<mark>
        - It holds the encrypted data. 
        - It contains the user's information.
    - How are the parts of a JWT (header, payload, and signature) separated?
        - Comma
        - <mark>Period<mark>
        - Colon
        - Semicolon
    - Which algorithm is commonly used for JWT signatures?
        - <mark>HMAC (Hash-based Message Authentication Code)<mark>
        - RSA (Rivest-Shamir-Adleman)
        - AES (Advanced Encryption Standard)
        - MD5 (Message Digest Algorithm 5)
    - How are JWTs commonly transmitted?
        - Only via HTTP headers
        - Only as query parameters in the URL
        - In the request body as JSON
        - <mark>Any of the above, depending on the application<mark>

## Implementation

Person database with JWT encryption.

![](/assets/img/post_images/jwt_db.png)
![](/assets/img/post_images/jwt_request.png)

### Extra

You can see that both the ssn of the user and the password are encrypted, however when requested the SSN does not return. This is intentional. When creating the SSN variable, I put `@JsonIgnore` to avoid sending this data to the frontend when requests are made for user data. This is because JWTs aren't very secure with the use of CSRF attacks, so when a user does login, the server doesn't always return the SSN of the user. This makes the server more secure to a degree, with SSN only needing to be entered in the very beginning when the user creates their account. When and if the SSN is needed to be used, it doesn't have to be called to the frontend for comparison. The user simply has to enter the last four digits and since these four digits are sent to the backend with the user name and password, verifications can be made with comparisons made in the backend only.

### Person.java


```java
package com.nighthawk.spring_portfolio.mvc.person;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vladmihalcea.hibernate.type.json.JsonType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Convert(attributeName ="person", converter = JsonType.class)
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotEmpty
    @Size(min=5)
    @Column(unique=true)
    @JsonIgnore
    private String ssn;

    @NotEmpty
    private String password;

    @NonNull
    @Size(min = 2, max = 30, message = "Name (2 to 30 chars)")
    private String name;

    public Person(String ssn, String password, String name) {
        this.ssn = ssn;
        this.password = password;
        this.name = name;
    }

    public static Person[] init() {
        Person p1 = new Person();
        p1.setName("testName");
        p1.setSsn("123-45-6789");
        p1.setPassword("testPass123!");

        Person persons[] = {p1};
        return persons;
    }

    public static void main(String[] args) {
        Person persons[] = init();
        for (Person person : persons) {
            System.out.println(person);
        }
    }
}
```

### PersonApiController.java


```java
package com.nighthawk.spring_portfolio.mvc.person;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/person")
public class PersonApiController {

    @Autowired
    private PersonJpaRepository repository;

    @Autowired
    private PersonDetailsService personDetailsService;

    @GetMapping("/")
    public ResponseEntity<List<Person>> getPeople() {
        return new ResponseEntity<>(repository.findAllByOrderByNameAsc(), HttpStatus.OK);
    }

    @PostMapping("/post")
    public ResponseEntity<Object> postPerson(@RequestParam("ssn") String ssn,
                                             @RequestParam("password") String password,
                                             @RequestParam("name") String name) {

        Person person = new Person(ssn, password, name);
        personDetailsService.save(person);
        return new ResponseEntity<>(name + " is created successfully", HttpStatus.CREATED);
    }
}
```

### PersonDetailsService.java


```java
package com.nighthawk.spring_portfolio.mvc.person;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
@Transactional
public class PersonDetailsService implements UserDetailsService {
    
    @Autowired
    private PersonJpaRepository personJpaRepository;

    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public UserDetails loadUserByUsername(String ssn) throws UsernameNotFoundException {
        Person person = personJpaRepository.findBySsn(ssn);
        if (person == null) {
            throw new UsernameNotFoundException("User not found with SSN: " + ssn);
        }

        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();

        return new org.springframework.security.core.userdetails.User(
                person.getSsn(),
                person.getPassword(),
                authorities
        );
    }

    public List<Person> listAll() {
        return personJpaRepository.findAllByOrderByNameAsc();
    }

    public List<Person> list(String name, String ssn) {
        return personJpaRepository.findByNameContainingIgnoreCaseOrSsnContainingIgnoreCase(name, ssn);
    }

    public List<Person> listLike(String term) {
        return personJpaRepository.findByNameContainingIgnoreCaseOrSsnContainingIgnoreCase(term, term);
    }

    public List<Person> listLikeNative(String term) {
        String likeTerm = String.format("%%%s%%", term);
        return personJpaRepository.findByLikeTermNative(likeTerm);
    }

    public void save(Person person) {
        person.setPassword(passwordEncoder().encode(person.getPassword()));
        person.setSsn(passwordEncoder().encode(person.getSsn()));
        personJpaRepository.save(person);
    }

    public Person get(long id) {
        return (personJpaRepository.findById(id).isPresent())
                ? personJpaRepository.findById(id).get()
                : null;
    }

    public Person getBySsn(String ssn) {
        return personJpaRepository.findBySsn(ssn);
    }

    public void delete(long id) {
        personJpaRepository.deleteById(id);
    }

    public void defaults(String password, String ssn, String roleName) {
        for (Person person : listAll()) {
            if (person.getPassword() == null || person.getPassword().isEmpty() || person.getPassword().isBlank()) {
                person.setPassword(passwordEncoder().encode(password));
            }
            if (person.getSsn() == null || person.getSsn().isEmpty() || person.getSsn().isBlank()) {
                person.setSsn(passwordEncoder().encode(ssn));
            }
        }
    }
}
```

### PersonJpaRepository.java


```java
package com.nighthawk.spring_portfolio.mvc.person;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PersonJpaRepository extends JpaRepository<Person, Long> {
    List<Person> findAllByOrderByNameAsc();

    Person findBySsn(String ssn);

    List<Person> findByNameContainingIgnoreCaseOrSsnContainingIgnoreCase(String name, String ssn);

    @Query(
            value = "SELECT * FROM Person p WHERE p.name LIKE ?1 or p.ssn LIKE ?1",
            nativeQuery = true)
    List<Person> findByLikeTermNative(String term);
}
```

### JwtApiController.java


```java
package com.nighthawk.spring_portfolio.mvc.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nighthawk.spring_portfolio.mvc.person.Person;
import com.nighthawk.spring_portfolio.mvc.person.PersonDetailsService;

@RestController
@CrossOrigin
public class JwtApiController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private PersonDetailsService personDetailsService;

    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody Person authenticationRequest) throws Exception {
        String encryptedSsn = authenticationRequest.getSsn();

        authenticate(encryptedSsn, authenticationRequest.getPassword());

        final UserDetails userDetails = personDetailsService.loadUserByUsername(encryptedSsn);

        final String token = jwtTokenUtil.generateToken(userDetails);

        final ResponseCookie tokenCookie = ResponseCookie.from("jwt", token)
            .httpOnly(true)
            .secure(true)
            .path("/")
            .maxAge(3600)
            .sameSite("None; Secure")
            .build();

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, tokenCookie.toString()).build();
    }

    private void authenticate(String ssn, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(ssn, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        } catch (Exception e) {
            throw new Exception(e);
        }
    }
}
```
