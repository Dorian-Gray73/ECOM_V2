package com.org.ecomv2.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.org.ecomv2.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class LigneTransactionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LigneTransaction.class);
        LigneTransaction ligneTransaction1 = new LigneTransaction();
        ligneTransaction1.setId(1L);
        LigneTransaction ligneTransaction2 = new LigneTransaction();
        ligneTransaction2.setId(ligneTransaction1.getId());
        assertThat(ligneTransaction1).isEqualTo(ligneTransaction2);
        ligneTransaction2.setId(2L);
        assertThat(ligneTransaction1).isNotEqualTo(ligneTransaction2);
        ligneTransaction1.setId(null);
        assertThat(ligneTransaction1).isNotEqualTo(ligneTransaction2);
    }
}
