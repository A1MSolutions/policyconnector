const mainContentId = "#main-content";

describe("Homepage", { scrollBehavior: "center" }, () => {
    beforeEach(() => {
        cy.clearIndexedDB();
        cy.intercept("/**", (req) => {
            req.headers["x-automated-test"] = Cypress.env("DEPLOYING");
        });
        cy.intercept("**/v3/resources/public/categories**", {
            fixture: "categories.json",
        }).as("categories");
        cy.intercept(
            "**/v3/resources/public/federal_register_links?page=1&page_size=5**",
            { fixture: "frdocs.json" },
        ).as("frdocs");
        cy.intercept("**/v3/resources/public/links?page=1&page_size=5**", {
            fixture: "recent-guidance.json",
        }).as("recentGuidance");
    });

    it("loads the homepage", () => {
        cy.viewport("macbook-15");
        cy.visit("/");
        cy.contains("Medicaid & CHIP eRegulations");
        cy.checkLinkRel();
        cy.injectAxe();
        cy.checkAccessibility();
    });

    it("has a hidden Skip to main content link", () => {
        cy.viewport("macbook-15");
        cy.visit("/");
        cy.get(".ds-c-skip-nav").then(($el) => {
            const rect = $el[0].getBoundingClientRect();
            expect(rect.bottom).to.equal(-56); // hidden off-screen
        });
    });

    it("should have a div id on the page that matches the href of the skip to main content link", () => {
        cy.viewport("macbook-15");
        cy.visit("/");
        cy.get(".ds-c-skip-nav").should("have.attr", "href", mainContentId);
        cy.get(mainContentId).should("exist");
    });

    it("focuses and displays the Skip to main content link after tab is pressed one time", () => {
        cy.viewport("macbook-15");
        cy.visit("/");
        cy.get("body").tab();
        cy.wait(500); // animation
        cy.focused().should("have.attr", "class", "ds-c-skip-nav");
        cy.focused().then(($el) => {
            const rect = $el[0].getBoundingClientRect();
            expect(rect.top).to.equal(0);
        });
    });

    it("has grouped FR docs in Related Rules tab", () => {
        cy.viewport("macbook-15");
        cy.visit("/");
        cy.get(".resources__container").should("exist");
        cy.get(".resources__container .v-tabs")
            .contains("Recent Rules")
            .click({ force: true });

        cy.get(".recent-rules-descriptive-text")
            .first()
            .should(($el) => {
                expect($el.text().trim()).to.equal(
                    "Includes 42 CFR 400, 430-460, 483, 600; 45 CFR 95, 155-156",
                );
            });

        cy.get(".related-rule").should("have.length", 7);
        cy.get(".related-rule.ungrouped").then(($els) => {
            expect($els).to.have.length(3);
            cy.wrap($els[1]).find(".recent-title").should("exist");
            cy.wrap($els[1])
                .find(".recent-flag")
                .then(($flag) => {
                    expect($flag).to.have.text("Final");
                    expect($flag)
                        .to.have.css("background-color")
                        .and.eq("rgb(2, 102, 102)");
                });
        });
        cy.get(".related-rule.grouped").then(($els) => {
            expect($els).to.have.length(4);
            cy.wrap($els[0]).find(".recent-title").should("not.exist");
            cy.wrap($els[0])
                .find(".recent-flag")
                .then(($flag) => {
                    expect($flag).to.have.text("WD");
                    expect($flag)
                        .to.have.css("background-color")
                        .and.eq("rgb(255, 255, 255)");
                });
        });

        cy.get(".resources__container")
            .contains("View More Changes")
            .should("not.exist");
    });

    it("Sets the label as Final, when correction and withdraw are both set to false", () => {
        cy.viewport("macbook-15");
        cy.visit("/");
        cy.get(".resources__container .v-tabs")
            .contains("Recent Rules")
            .click();
        cy.get(".related-rule.ungrouped").then(($els) => {
            cy.wrap($els[1]).find(".recent-title").should("exist");
            cy.wrap($els[1])
                .find(".recent-flag")
                .then(($flag) => {
                    expect($flag).to.have.text("Final");
                    expect($flag)
                        .to.have.css("background-color")
                        .and.eq("rgb(2, 102, 102)");
                });
        });
    });

    it("Sets the label as WD when Correction is false and Withdrawal is true", () => {
        cy.viewport("macbook-15");
        cy.visit("/");
        cy.get(".resources__container .v-tabs")
            .contains("Recent Rules")
            .click();
        cy.get(".related-rule.grouped").then(($els) => {
            cy.wrap($els[0]).find(".recent-title").should("not.exist");
            cy.wrap($els[0])
                .find(".recent-flag")
                .then(($flag) => {
                    expect($flag).to.have.text("WD");
                    expect($flag)
                        .to.have.css("background-color")
                        .and.eq("rgb(255, 255, 255)");
                    expect($flag)
                        .to.have.css("color")
                        .and.eq("rgb(91, 97, 107)");
                    expect($flag)
                        .to.have.css("border-color")
                        .and.eq("rgb(91, 97, 107)");
                    expect($flag).to.have.css("border-width").and.eq("1px");
                    expect($flag).to.have.css("border-style").and.eq("solid");
                });
        });
    });

    it("Sets the label as WD when Correction is true and Withdrawal is true", () => {
        cy.viewport("macbook-15");
        cy.visit("/");
        cy.get(".resources__container .v-tabs")
            .contains("Recent Rules")
            .click();
        cy.get(".related-rule.grouped").then(($els) => {
            cy.wrap($els[3]).find(".recent-title").should("not.exist");
            cy.wrap($els[3])
                .find(".recent-flag")
                .then(($flag) => {
                    expect($flag).to.have.text("WD");
                    expect($flag)
                        .to.have.css("background-color")
                        .and.eq("rgb(255, 255, 255)");
                    expect($flag)
                        .to.have.css("color")
                        .and.eq("rgb(91, 97, 107)");
                    expect($flag)
                        .to.have.css("border-color")
                        .and.eq("rgb(91, 97, 107)");
                    expect($flag).to.have.css("border-width").and.eq("1px");
                    expect($flag).to.have.css("border-style").and.eq("solid");
                });
        });
    });

    it("Sets the label as CORR when Correction is true and Withdrawal is false", () => {
        cy.viewport("macbook-15");
        cy.visit("/");
        cy.get(".resources__container .v-tabs")
            .contains("Recent Rules")
            .click();
        cy.get(".related-rule.ungrouped").then(($els) => {
            cy.wrap($els[0]).find(".recent-title").should("exist");
            cy.wrap($els[0])
                .find(".recent-flag")
                .then(($flag) => {
                    expect($flag).to.have.text("CORR");
                    expect($flag)
                        .to.have.css("background-color")
                        .and.eq("rgb(214, 215, 217)");
                });
        });
    });

    it("Does not allow selection of Part till Title is selected in Jump To", () => {
        cy.viewport("macbook-15");
        cy.visit("/");
        cy.get("#jumpToPart").should("be.disabled");
        cy.get("#jumpToTitle").select("45");
        cy.get("#jumpToPart").should("not.be.disabled");
    });

    it("Does not include Part 75 when Title 45 is selected in Jump To", () => {
        cy.viewport("macbook-15");
        cy.visit("/");
        cy.get("#jumpToTitle").select("45");
        cy.get("#jumpToPart").then(($select) => {
            const options = $select.find("option");
            const values = [...options].map((o) => o.value);
            expect(values).to.not.include("75");
        });
    });

    it("jumps to a regulation Part using the jump-to select", () => {
        cy.viewport("macbook-15");
        cy.visit("/");
        cy.jumpToRegulationPart({ title: "45", part: "95" });
    });

    it("jumps to a regulation Part section using the section number text input", () => {
        cy.viewport("macbook-15");
        cy.visit("/");
        cy.jumpToRegulationPartSection({
            title: "42",
            part: "433",
            section: "40",
        });
    });

    it("clicks on Title 42 Part 430 in ToC and loads the page", () => {
        cy.viewport("macbook-15");
        cy.visit("/");
        cy.get(".toc__container").contains("Part 430").click();

        cy.url().should("eq", Cypress.config().baseUrl + "/42/430/");
        cy.contains("Grants to States for Medical Assistance Programs");
    });

    it("clicks on Title 45 Part 95 in ToC and loads the page", () => {
        cy.viewport("macbook-15");
        cy.visit("/");
        cy.get(".toc__container .v-tabs").contains("Title 45").click();
        cy.get(".toc__container").contains("Part 95").click();

        cy.url().should("eq", Cypress.config().baseUrl + "/45/95/");
        cy.contains(
            "General Administration—Grant Programs (Public Assistance, Medical Assistance and State Children's Health Insurance Programs)",
        );
    });

    it("allows a user to go back to the homepage by clicking the top left link", () => {
        cy.viewport("macbook-15");
        cy.visit("/42/430/");
        cy.goHome();
    });

    it("has the correct descriptive text", () => {
        cy.viewport("macbook-15");
        cy.visit("/");
        cy.get(".cta .about-text__container p").should(($el) => {
            expect($el.text().replace(/\s+/g, " ").trim()).to.equal(
                "eRegulations organizes together regulations, subregulatory guidance, and other related policy materials.",
            );
        });
    });

    it("takes you to the about page when clicking 'Learn About This Tool'", () => {
        cy.viewport("macbook-15");
        cy.visit("/");
        cy.get(".cta .about-text__container a")
            .contains("Learn About This Tool")
            .click();
        cy.url().should("eq", Cypress.config().baseUrl + "/about/");
    });

    it("takes you to the proper sample search", () => {
        cy.viewport("macbook-15");
        cy.visit("/");
        cy.get(".policy-materials__container a.sample-search-btn")
            .contains("Try a Sample Search")
            .click({ force: true });
        cy.url().should(
            "eq",
            Cypress.config().baseUrl +
                `/search/?q=%22public%20health%20emergency%22`,
        );
    });

    it("has Recent Subregulatory Guidance tab and results with clickable subjects", () => {
        cy.viewport("macbook-15");
        cy.visit("/");
        cy.get(".resources__container").should("exist");
        cy.wait("@categories");
        cy.get(".recent-rules-descriptive-text").should("not.exist");
        cy.get(".resources__container")
            .contains("View More Guidance")
            .should("not.exist");
        cy.get(".document__subjects a")
            .eq(0)
            .should("have.text", "Administrative Claiming Fixture Value");
        cy.get(".document__subjects a")
            .eq(1)
            .should("have.text", "Cost Allocation");
        cy.get(`a[data-testid=add-subject-chip-157]`)
            .should("have.attr", "title")
            .and("include", "Public Assistance Cost Allocation");
        cy.get(`a[data-testid=add-subject-chip-157]`).click({
            force: true,
        });
        cy.url().should("include", "/subjects/?subjects=157");
    });

    it("loads the last parser success date from the API endpoint and displays it in footer", () => {
        cy.intercept("**/v3/ecfr_parser_result/**").as("parserResult");
        cy.viewport("macbook-15");
        cy.visit("/");
        //cy.wait("@parserResult");
        cy.get(".last-updated-date")
            .invoke("text")
            .should("match", /^\w{3} (\d{1}|\d{2}), \d{4}$/);
    });

    it("should have an open left nav on load on desktop", () => {
        cy.viewport("macbook-15");
        cy.visit("/");
        cy.get("nav#leftNav").should("have.attr", "class", "open");
    });

    it("should have a closed left nav on load on tablet", () => {
        cy.viewport(800, 1024);
        cy.visit("/");
        cy.get("nav#leftNav").should("have.attr", "class", "closed");
    });

    it("should have a closed left nav on mobile", () => {
        cy.viewport("iphone-x");
        cy.visit("/");
        cy.get("nav#leftNav").should("have.attr", "class", "closed");
    });

    it("should responsively open and close the left nav if user does not click open/close button", () => {
        cy.viewport("macbook-15");
        cy.visit("/");
        cy.get("nav#leftNav").should("have.attr", "class", "open");
        cy.viewport(800, 1024);
        cy.get("nav#leftNav").should("have.attr", "class", "closed");
        cy.viewport("macbook-15");
        cy.get("nav#leftNav").should("have.attr", "class", "open");
    });

    it("should keep left nav open if user explicitly expands it, even if screen width changes", () => {
        cy.viewport(800, 1024);
        cy.visit("/");
        cy.get("nav#leftNav").should("have.attr", "class", "closed");
        cy.get("button.nav-toggle__button").click({ force: true });
        cy.get("nav#leftNav").should("have.attr", "class", "open");
        cy.viewport("macbook-15");
        cy.get("nav#leftNav").should("have.attr", "class", "open");
        cy.viewport(800, 1024);
        cy.get("nav#leftNav").should("have.attr", "class", "open");
        cy.viewport("iphone-x");
        cy.get("nav#leftNav").should("have.attr", "class", "open");
    });

    it("takes you to a google doc when you click the 'Contact the Team' link", () => {
        cy.viewport("macbook-15");
        cy.visit("/");
        cy.get(".contact__column a")
            .scrollIntoView()
            .should("have.attr", "href")
            .and("include", "https://docs.google.com");
    });

    it("takes you to a google doc when you click the 'Sign up for a session' link", () => {
        cy.viewport("macbook-15");
        cy.visit("/");
        cy.get(".signup__column a")
            .scrollIntoView()
            .should("have.attr", "href")
            .and("include", "https://docs.google.com");
    });
});
