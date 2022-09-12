package com.org.ecomv2.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.org.ecomv2.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ModeleTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Modele.class);
        Modele modele1 = new Modele();
        modele1.setId(1L);
        Modele modele2 = new Modele();
        modele2.setId(modele1.getId());
        assertThat(modele1).isEqualTo(modele2);
        modele2.setId(2L);
        assertThat(modele1).isNotEqualTo(modele2);
        modele1.setId(null);
        assertThat(modele1).isNotEqualTo(modele2);
    }
}
