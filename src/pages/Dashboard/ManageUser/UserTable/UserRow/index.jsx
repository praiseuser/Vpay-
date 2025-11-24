import { Chip, IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { StyledTableCell, StyledEmailPhoneCell, StyledSwitch } from '../styles';

const UserRow = ({ user, index, onSuspend, loading, onViewDetails }) => {
    return {
        id: <StyledTableCell className="table-text font-weight-600">{index + 1}</StyledTableCell>,
        firstname: <StyledTableCell className="table-text font-weight-400">{user.firstname || "N/A"}</StyledTableCell>,
        lastname: <StyledTableCell className="table-text font-weight-400">{user.lastname || "N/A"}</StyledTableCell>,
        email: <StyledEmailPhoneCell className="table-text font-weight-500">{user.email || "N/A"}</StyledEmailPhoneCell>,
        status: (
            <StyledTableCell>
                <Chip
                    label={user.status === 1 ? "Active" : "Suspended"}
                    color={user.status === 1 ? "success" : "error"}
                    size="small"
                    variant="outlined"
                    sx={{ fontWeight: 500 }}
                />
            </StyledTableCell>
        ),
        phone: <StyledEmailPhoneCell className="table-text font-weight-500">{user.phone || "N/A"}</StyledEmailPhoneCell>,
        gender: <StyledTableCell className="table-text font-weight-400">{user.gender || "N/A"}</StyledTableCell>,
        action: (
            <StyledTableCell>
                <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", alignItems: "center" }}>
                    <Tooltip title={user.status === 1 ? "Suspend User" : "Activate User"}>
                        <StyledSwitch
                            checked={user.status === 1}
                            onChange={() => onSuspend(user.id, user.status)}
                            disabled={loading[user.id]}
                        />
                    </Tooltip>
                    <Tooltip title="View Details">
                        <IconButton size="small" onClick={() => onViewDetails(user.id)}>
                            <VisibilityIcon style={{ color: "#1976d2" }} />
                        </IconButton>
                    </Tooltip>
                </div>
            </StyledTableCell>
        ),
    };
};

export default UserRow;
