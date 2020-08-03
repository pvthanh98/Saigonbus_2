export const BlueprintValidate = (blueprint) => {
	if (
		blueprint.b_media === "" ||
		blueprint.b_name === "" ||
		blueprint.b_redirect_link === "" ||
		blueprint.b_session_timeout === "" ||
		blueprint.b_shutdown_time === "" ||
        blueprint.b_turn_on_time === "" ||
        blueprint.b_auth_idle_timeout ==="" ||
        blueprint.b_max_clients ===""
	)
		return false;
	return true;
};
