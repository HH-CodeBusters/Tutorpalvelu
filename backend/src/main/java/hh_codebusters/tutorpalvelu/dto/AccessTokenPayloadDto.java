package hh_codebusters.tutorpalvelu.dto;

import java.time.Instant;

public record AccessTokenPayloadDto(String accessToken, Instant expiresAt) {
}
